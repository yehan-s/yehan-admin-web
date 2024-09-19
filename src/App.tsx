import { RouterProvider, createHashRouter } from 'react-router-dom'

import './App.css'

function App() {
  const router = createHashRouter([
    {
      path: '/user/login',
      // Component: Login,
    },
    {
      path: '/',
      // Component: BasicLayout,
      // children: routeConfig,
    },
    {
      path: '*',
      // Component: Result404,
    },
  ])

  return <RouterProvider router={router} />
}

export default App
