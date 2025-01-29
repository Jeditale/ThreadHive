// components/NavBar.js
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-[#EAC67A] dark:bg-[#2A1C08] z-50 shadow-lg">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="bg-[#FAF3B8] pl-1 pr-1 dark:bg-[#2A1C08] rounded-lg">
          <img src="/assets/Logo.png" className="w-auto h-12" />
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <form className="max-w-md mx-auto">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search"
                className="block w-full p-2 pl-10 pr-4 text-sm dark:text-white dark:bg-[#5b4e4a] rounded-2xl shadow-lg"
              />
              <img
                src="/assets/search.png"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                alt="Search Icon"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm dark:text-white">
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Auth Links */}
        <div className="flex space-x-4">
          <Link href="/login" className="text-white px-3 py-2 rounded-lg bg-[#3C2A10] dark:bg-[#4a3d22] p-2 shadow-lg">Login</Link>
          <Link href="/register" className="text-white px-3 py-2 rounded-lg bg-[#3C2A10] dark:bg-[#4a3d22] p-2 shadow-lg">Register</Link>
        </div>
      </div>
    </div>
  );
}
