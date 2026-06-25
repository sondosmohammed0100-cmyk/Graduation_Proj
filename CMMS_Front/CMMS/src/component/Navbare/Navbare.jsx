import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import imgdefault from "../../assets/imgdefault.png";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios/Axios";

export default function Navbare() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [dropOpen,    setDropOpen]    = useState(false);
  const [user,        setUser]        = useState(null);
  const dropRef  = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return;
    api.get("/profile")
      .then(({ data }) => setUser(data.user))
      .catch(() => {});
  }, []);

  
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const isLoggedIn = !!(localStorage.getItem("token") || sessionStorage.getItem("token"));

  const avatarSrc = user?.profile?.secure_url || imgdefault;
  const fullName  = user ? `${user.Fname} ${user.Lname}` : "";
  const role      = user?.role || "";

  return (
    <nav className="bg-neutral-primary sticky top-0 w-full z-50 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap items-center justify-between mx-auto p-4 gap-4">

        {/* Logo */}
        <div className="flex items-center order-1">
          <Link to="/home">
            <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
          </Link>
        </div>

        {/* Menu links */}
        <div className={`${menuOpen ? "block" : "hidden"} md:block order-3 md:order-2 w-full md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:gap-8 p-4 md:p-0 items-start md:items-center">
            <li><Link className="text-heading hover:text-blue-600 transition-colors" to="/home">Home</Link></li>
            <li><Link className="text-heading hover:text-blue-600 transition-colors" to="/devices">Devices</Link></li>
            <li><Link className="text-heading hover:text-blue-600 transition-colors" to="/departments">Departments</Link></li>
            <li><Link className="text-heading hover:text-blue-600 transition-colors" to="/maintenance">Maintenance</Link></li>
            <li><Link className="text-heading hover:text-blue-600 transition-colors" to="/orders">Work Orders</Link></li>

            {/* Mobile-only auth links */}
            {!isLoggedIn && <>
              <li className="md:hidden mt-2"><Link className="text-heading" to="/register">Register</Link></li>
              <li className="md:hidden"><Link className="text-heading" to="/login">Login</Link></li>
            </>}
            {isLoggedIn && (
              <li className="md:hidden mt-2">
                <button onClick={handleSignOut} className="text-red-500 font-medium">Sign Out</button>
              </li>
            )}
          </ul>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3 order-2 md:order-3">

          {/* Search */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-body" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-full bg-neutral-secondary-medium
                         border border-default-medium text-heading text-sm
                         focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </div>

          {isLoggedIn ? (
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full focus:outline-none"
              >
                <img
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-200 hover:ring-blue-400 transition-all"
                  src={avatarSrc}
                  alt="user"
                />
                
                {fullName && (
                  <span className="hidden md:block text-sm font-medium text-heading max-w-[120px] truncate">
                    {fullName}
                  </span>
                )}
                <svg className="hidden md:block w-4 h-4 text-body" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="m6 9 6 6 6-6"/>
                </svg>
              </button>

              {/* Dropdown */}
              {dropOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100
                                animate-[fadeIn_0.15s_ease_both] z-50 overflow-hidden">

                  {/* User info header */}
                  <div className="px-4 py-3 border-b border-slate-100 bg-blue-50/60">
                    <p className="text-sm font-semibold text-blue-800 truncate">{fullName}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                      {role}
                    </span>
                  </div>

                  {/* Links */}
                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setDropOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700
                                 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                          d="M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/>
                      </svg>
                      My Profile
                    </Link>

                    <button
                      onClick={() => { setDropOpen(false); handleSignOut(); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500
                                 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                          d="M17 16l4-4m0 0-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"/>
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
           
            <ul className="hidden md:flex gap-3 items-center">
              <li>
                <Link to="/register"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login"
                  className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-xl
                             hover:bg-blue-700 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          )}

          {/* Mobile search */}
          <button className="md:hidden p-2 flex items-center">
            <svg className="w-6 h-6 text-heading" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </button>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 flex items-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}