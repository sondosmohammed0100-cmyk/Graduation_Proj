import React from 'react'

import style from "./Layout.module.css"
import Footer from '../Footer/Footer'
import Navbare from '../Navbare/Navbare'
  import { Outlet } from 'react-router-dom'
export default function Layout() {
  return (
    <>
      <Navbare />

      <div className="container pt-20">
        <Outlet />
      </div>

      <Footer />
    </>
  )
}
