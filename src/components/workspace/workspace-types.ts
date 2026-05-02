import type { ReactNode, ComponentType } from "react"

export interface WorkspaceNavItem {
  id: string
  title: string
  icon?: ComponentType<{ className?: string }>
  content: ReactNode
}

export interface WorkspaceNavGroup {
  label?: string
  items: WorkspaceNavItem[]
}

export interface WorkspaceLayoutProps {
  groups: WorkspaceNavGroup[]
  header?: ReactNode
  defaultOpenIds?: string[]
  defaultActiveId?: string
  className?: string
}
