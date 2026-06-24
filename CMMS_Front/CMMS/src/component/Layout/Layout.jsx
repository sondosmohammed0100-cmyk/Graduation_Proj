import React from 'react'

import style from "./Layout.module.css"
import Footer from '../Footer/Footer'
import Navbare from '../Navbare/Navbare'
import { Outlet } from 'react-router-dom'
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbare /> */}

      <div className="max-w-screen-xl mx-auto px-4 my-5 flex-grow w-full ">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  )
}
