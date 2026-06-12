import React, { useState } from "react";
import style from "./Navbare.module.css";
import logo from "../../assets/logo.png";
import imgdefault from "../../assets/imgdefault.png";
import { Link } from "react-router-dom";
export default function Navbare() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-neutral-primary sticky top-0 w-full z-20 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap items-center justify-between mx-auto p-4 gap-4">
        {/* Logo */}
        <div className="flex items-center order-1">
          <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
        </div>

        {/* Menu - desktop inline, mobile collapsible */}
        <div className={`${open ? "block" : "hidden"} md:block order-3 md:order-2 w-full md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:gap-8 p-4 md:p-0 items-start md:items-center">
            <li>
              <Link className="text-heading" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-heading" to="/devices">
                Devices
              </Link>
            </li>
            <li>
              <Link className="text-heading" to="/departments">
                Departments
              </Link>
            </li>
            <li>
              <Link className="text-heading" to="/maintenance">
                Maintenance
              </Link>
            </li>
            <li>
              <Link className="text-heading" to="/orders">
                Work Orders
              </Link>
            </li>

            {/* Mobile auth links */}
            <li className="md:hidden">
              <Link to="register">Register</Link>
            </li>
            <li className="md:hidden">
              <Link to="login">Login</Link>
            </li>
            <li className="md:hidden">
              <span>SignOut</span>
            </li>
          </ul>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3 order-2 md:order-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-body"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search..."
              className="
                w-64
                pl-10 pr-4 py-2
                rounded-full
                bg-neutral-secondary-medium
                border border-default-medium
                text-heading
                text-sm
                focus:outline-none
                focus:ring-2 focus:ring-brand
                focus:border-brand
              "
            />
          </div>

          {/* User */}
          <button className="flex items-center text-sm rounded-full">
            <img
              className="w-9 h-9 rounded-full object-cover"
              src={imgdefault}
              alt="user"
            />
          </button>

          <ul className="hidden md:flex gap-3 items-center">
            <li>
              <Link to="register">Register</Link>
            </li>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <span>SignOut</span>
            </li>
          </ul>

          {/* Mobile search button */}
          <button className="md:hidden p-2 flex items-center">
            <svg
              className="w-6 h-6 text-heading"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>

          {/* Mobile menu toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 flex items-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}