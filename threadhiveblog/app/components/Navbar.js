// components/NavBar.js
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-orange-300 z-50">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="text-lg font-bold">Logo</div>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <form className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="search"
                className="block w-full p-2 pl-4 pr-10 text-sm border rounded-md"
                placeholder="Search"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm">
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Auth Links */}
        <div className="flex space-x-4">
          <Link href="/login" className="px-3 py-2 rounded-md">Login</Link>
          <Link href="/register" className="px-3 py-2 rounded-md">Register</Link>
        </div>
      </div>
    </div>
  );
}
