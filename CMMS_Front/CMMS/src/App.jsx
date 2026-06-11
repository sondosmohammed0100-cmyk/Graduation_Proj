import { useState } from 'react'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Register from './component/Register/Register'
import Login from './component/Login/Login'
import Notfound from './component/Notfound/Notfound'
import Dashboard from './Pages/Dashboard'
function App() {
  let routes = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <Dashboard /> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
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
