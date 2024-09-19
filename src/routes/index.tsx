import { DashboardOutlined, TableOutlined } from '@ant-design/icons'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

export interface MenuItem {
  path: string
  title?: string
  icon?: any
  element?: any
  children?: MenuItem[]
  layout?: boolean
  Componenet?: any
}

export const routeConfig: MenuItem[] = [

]
