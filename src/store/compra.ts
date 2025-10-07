/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { CompraData, Pagination } from '@/interfaces/Compra'
import { ComprasService } from '@/services/compras/compras.service'

type CompraStore = {
  data: CompraData[]
  statistics: any
  pagination: Pagination
  meta: { month?: string; prevMonth?: string }
  loading: boolean
  error: string | null
  // actions
  fetchCompras: (page?: number, limit?: number, month?: string) => Promise<void>
  searchCompras: (term: string) => Promise<void>
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  setSelectedMonth: (month: string) => void
  clear: () => void
}

export const useCompraStore = create<CompraStore>()(devtools((set: any, get: any) => ({

    
  data: [],
  statistics: [],
  pagination: { page: 1, limit: 10, total: 0, pages: 1 },
  meta: { month: undefined, prevMonth: undefined },
  loading: false,
  error: null,

  fetchCompras: async (page = get().pagination.page, limit = get().pagination.limit, month = get().meta.month ?? '') => {
    try {
      set({ loading: true, error: null })
      const resp = await ComprasService.getCompras(page, limit, month)
      set({ data: resp.data, pagination: resp.pagination, statistics: resp.statistics ?? null, loading: false })
    } catch (err: any) {
      set({ error: err?.message ?? 'Error', loading: false })
      throw err
    }
  },

  searchCompras: async (term: string) => {
    try {
      set({ loading: true, error: null })
      const currentMonth = get().meta.month ?? ''
      const resp = await ComprasService.searchCompras(term, 1, 50, currentMonth)
      set({ data: resp.data, pagination: resp.pagination, loading: false })
    } catch (err: any) {
      set({ error: err?.message ?? 'Error', loading: false })
      throw err
    }
  },

  setPage: (page: number) => {
  set((state: any) => ({ pagination: { ...state.pagination, page } }))
    // trigger fetch
    get().fetchCompras(page, get().pagination.limit, get().meta.month)
  },

  setLimit: (limit: number) => {
  set((state: any) => ({ pagination: { ...state.pagination, limit, page: 1 } }))
    get().fetchCompras(1, limit, get().meta.month)
  },

  setSelectedMonth: (month: string) => {
    set({ meta: { ...get().meta, month }, pagination: { ...get().pagination, page: 1 } })
    get().fetchCompras(1, get().pagination.limit, month)
  },

  clear: () => {
    set({ data: [], pagination: { page: 1, limit: 10, total: 0, pages: 1 }, loading: false, error: null, meta: { month: undefined, prevMonth: undefined } })
  },
}), { name: 'compra-store' }))

export default useCompraStore
