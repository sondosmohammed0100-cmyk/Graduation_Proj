import React from 'react'
import style from "./Footer.module.css"
import { Link } from 'react-router-dom'
export default function Footer() {
  return <>

  <footer className="bg-neutral-primary rounded-base shadow-xs mt-auto">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between ">
      <span className="text-sm text-body sm:text-center ">© 2026 <Link to="" className="hover:underline">DeviceCare™</Link>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
        <li>
            <Link to="" className="hover:underline me-4 md:me-6">About</Link>
        </li>
        <li>
            <Link to="" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
        </li>
        <li>
            <Link to="" className="hover:underline me-4 md:me-6">Licensing</Link>
        </li>
        <li>
            <Link to="" className="hover:underline">Contact</Link>
        </li>
    </ul>
    </div>
</footer>

  </>

}