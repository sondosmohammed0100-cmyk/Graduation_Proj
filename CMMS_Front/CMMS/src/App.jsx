import { useState } from 'react'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Register from './component/Register/Register'
import Login from './component/Login/Login'
import Notfound from './component/Notfound/Notfound'
import Dashboard from './Pages/Dashboard'
import Devices from './component/Devices/Devices'
import Department from './component/Department/Department'
import Order from './component/Order/Order'
import Maintenance from './component/Maintenance/Maintenance'
function App() {
  let routes = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <Dashboard /> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'devices', element: <Devices /> },
        { path: 'departments', element: <Department /> },
        {path:'maintenance',element:<Maintenance/>},
        { path: 'orders', element: <Order /> },
        { path: '*', element: <Notfound /> }

      ]
    }

  ])

  return (
    <RouterProvider router={routes}>

    </RouterProvider>
  )
}

export default App
