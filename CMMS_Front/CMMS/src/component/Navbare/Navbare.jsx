import React, { useState } from 'react'
import style from "./Navbare.module.css"
import logo from '../../assets/logo.png'
import imgdefault from '../../assets/imgdefault.png'
export default function Navbare() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-auto object-contain"
        />

        {/* Right section */}
        <div className="flex items-center gap-3 md:order-2">

          {/* Search */}
          <div className="relative hidden md:block">

            {/* icon */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-body" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>

            {/* input */}
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
          <button className="flex text-sm rounded-full">
            <img
              className="w-9 h-9 rounded-full object-cover"
              src={imgdefault}
              alt="user"
            />
          </button>

          {/* Mobile button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6 text-heading" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2"
          >
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

        {/* Menu */}
        <div
          className={`
    ${open ? "block" : "hidden"}
    absolute md:static top-full left-0 w-full md:w-auto
    bg-white md:bg-transparent
    shadow-md md:shadow-none
    z-50
    md:block
  `}
        >
          <ul className="flex flex-col md:flex-row md:gap-8 p-4 md:p-0">
            <li><a className="text-heading" href="/">Home</a></li>
            <li><a className="text-heading" href="/devices">Devices</a></li>
            <li><a className="text-heading" href="/departments">Departments</a></li>
            <li><a className="text-heading" href="/maintenance">Maintenance</a></li>
            <li><a className="text-heading" href="/orders">Work Orders</a></li>
          </ul>
        </div>

      </div>
    </nav>
  )
}