"use client";

import * as React from "react";
import {

  IconDashboard,

  IconHelp,
  IconInnerShadowTop,

  IconSearch,
  IconSettings,
  IconUsers,
  IconShoppingBag,
  IconPaperBag,
  IconUserCircle,
  IconUserCog,
  IconCash,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/store/auth";
import { Link } from 'react-router-dom';

const navMain = [
  {
    title: "Panel Principal",
    url: "/",
    icon: IconDashboard,
  },
  {
    title: "Ingresos",
    url: "/ingresos",
    icon: IconCash,
  },
  {
    title: "Compras",
    url: "/compras",
    icon: IconShoppingBag,
  },
  {
    title: "Gastos",
    url: "/gastos",
    icon: IconPaperBag,
  },
  {
    title: "Planillas",
    url: "/planillas",
    icon: IconUsers,
  },
  {
    title: "Empleados",
    url: "/empleados",
    icon: IconUserCircle,
  },
  {
    title: "Proveedores",
    url: "/proveedores",
    icon: IconUserCog,
  },
];

const navSecondary = [
  {
    title: "Configuracion",
    url: "#",
    icon: IconSettings,
  },
  {
    title: "Acerca de",
    url: "#",
    icon: IconHelp,
  },
  {
    title: "Buscar",
    url: "#",
    icon: IconSearch,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  // Datos del usuario desde el store o valores por defecto
  const userData = {
    name: user?.name || user?.email || "Usuario",
    email: user?.email || "usuario@example.com",
    avatar: "/avatars/default.jpg",
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              
              <Link to="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  El Buen Amigo Souvenir
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
