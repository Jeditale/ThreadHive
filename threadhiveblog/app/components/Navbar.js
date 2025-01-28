// components/NavBar.js
"use client"

import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (cookies.token) {
        setIsAuthenticated(true);
    }
  }, [cookies]);


  return (
    <div className="fixed top-0 left-0 right-0 bg-[#EAC67A] z-50 shadow-lg">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="text-lg font-bold">Logo</div>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <form className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="search"
                className="block w-full p-2 pl-5 pr-4 text-sm border rounded-2xl shadow-lg bg-[url('/assets/search.png')] bg-no-repeat bg-[length:16px_16px] bg-left px-4"
                placeholder="Search "
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm">
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Auth Links */}
        
        <div className="flex space-x-4" >
          {
            isAuthenticated ? (
              <>
                <Link href="/profile" className="text-white px-3 py-2 rounded-lg bg-[#3C2A10] p-2 shadow-lg">
                    Profile
                </Link>
            
              </>

            ) : (
              <>
                <Link href="/login" className="text-white px-3 py-2 rounded-lg bg-[#3C2A10] p-2shadow-lg">Login</Link>
                <Link href="/register" className="text-white px-3 py-2 rounded-lg bg-[#3C2A10] p-2 shadow-lg">Register</Link>
              </>
            )
          }
          
        </div>
      </div>
    </div>
  );
}
