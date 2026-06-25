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
import ProtectedRout from './component/ProtectedRout/ProtectedRout'
import ForgotPassword from './component/ForgotPassword/ForgotPassword'
import ResetPassword from './component/ResetPassword/ResetPassword'
import Profile from './component/Profile/Profile'

function App() {
  let routes = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        
        { path:"/home", element:<ProtectedRout><Dashboard /> </ProtectedRout> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
         { path: "forgot-password",  element: <ForgotPassword /> },          
        { path: "reset/:token",     element: <ResetPassword /> },
        { path: "profile", element: <ProtectedRout><Profile /></ProtectedRout> },            
        { path: 'devices', element: <ProtectedRout><Devices /></ProtectedRout> },
        { path: 'departments', element:<ProtectedRout><Department /></ProtectedRout>  },
        {path:'maintenance',element:<ProtectedRout><Maintenance/></ProtectedRout>},
        { path: 'orders', element: <ProtectedRout><Order /></ProtectedRout> },
        { path: '*', element:<ProtectedRout> <Notfound /></ProtectedRout> }

      ]
    }

  ])

  return (
    <RouterProvider router={routes}>

    </RouterProvider>
  )
}

export default App


