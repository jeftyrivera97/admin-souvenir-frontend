/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { PlanillaData, Pagination } from '@/interfaces/Planilla'
import { PlanillasService } from '@/services/planillas/planilla.service'

type PlanillaStore = {
  data: PlanillaData[]
  statistics: any
  pagination: Pagination
  meta: { month?: string; prevMonth?: string }
  loading: boolean
  error: string | null
  // actions
  fetchPlanillas: (page?: number, limit?: number, month?: string) => Promise<void>
  searchPlanillas: (term: string) => Promise<void>
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  setSelectedMonth: (month: string) => void
  clear: () => void
}

export const usePlanillaStore = create<PlanillaStore>()(devtools((set: any, get: any) => ({

    
  data: [],
  statistics: [],
  pagination: { page: 1, limit: 10, total: 0, pages: 1 },
  meta: { month: undefined, prevMonth: undefined },
  loading: false,
  error: null,

  fetchPlanillas: async (page = get().pagination.page, limit = get().pagination.limit, month = get().meta.month ?? '') => {
    try {
      set({ loading: true, error: null })
      const resp = await PlanillasService.getPlanillas(page, limit, month)
      set({ data: resp.data, pagination: resp.pagination, statistics: resp.statistics ?? null, loading: false })
    } catch (err: any) {
      set({ error: err?.message ?? 'Error', loading: false })
      throw err
    }
  },

  searchPlanillas: async (term: string) => {
    try {
      set({ loading: true, error: null })
      const currentMonth = get().meta.month ?? ''
      const resp = await PlanillasService.searchPlanillas(term, 1, 50, currentMonth)
      set({ data: resp.data, pagination: resp.pagination, loading: false })
    } catch (err: any) {
      set({ error: err?.message ?? 'Error', loading: false })
      throw err
    }
  },

  setPage: (page: number) => {
  set((state: any) => ({ pagination: { ...state.pagination, page } }))
    // trigger fetch
    get().fetchPlanillas(page, get().pagination.limit, get().meta.month)
  },

  setLimit: (limit: number) => {
  set((state: any) => ({ pagination: { ...state.pagination, limit, page: 1 } }))
    get().fetchPlanillas(1, limit, get().meta.month)
  },

  setSelectedMonth: (month: string) => {
    set({ meta: { ...get().meta, month }, pagination: { ...get().pagination, page: 1 } })
    get().fetchPlanillas(1, get().pagination.limit, month)
  },

  clear: () => {
    set({ data: [], pagination: { page: 1, limit: 10, total: 0, pages: 1 }, loading: false, error: null, meta: { month: undefined, prevMonth: undefined } })
  },
}), { name: 'ingreso-store' }))

export default usePlanillaStore
