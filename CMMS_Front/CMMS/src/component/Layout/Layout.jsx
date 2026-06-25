import React from 'react'
import style from "./Layout.module.css"
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbare from "../Navbare/Navbare";

export default function Layout() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register"||
      location.pathname === "/forgot-password"||
  location.pathname.startsWith("/reset/"); ;

  return (
    <div className="flex flex-col min-h-screen">

      {!isAuthPage && <Navbare />}

      <div className="flex-grow">
        <Outlet />
      </div>

      {!isAuthPage && <Footer />}
    </div>
  );
}