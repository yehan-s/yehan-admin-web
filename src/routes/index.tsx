import Result404 from '@/pages/404'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '*',
      Component: Result404,
    },
  ])
  return <RouterProvider router={router} />
}

export default Router
