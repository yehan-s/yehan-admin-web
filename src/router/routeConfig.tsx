

export interface MenuItem {
  path: string
  title?: string
  icon?: any
  element?: any
  children?: MenuItem[]
  layout?: boolean
  Componenet?: any
}

export const routeConfig: MenuItem[] = []
