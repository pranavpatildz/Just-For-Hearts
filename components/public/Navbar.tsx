"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="text-lg font-semibold text-gray-800">
          Just For Hearts
        </Link>

        {/* Right: Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/why-jfh">Why JFH</NavLink>
          <NavLink href="/why-year-round">Why Year Round</NavLink>
          <NavLink href="/get-started">Get Started</NavLink>
          <Link
            href="/admin/login"
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-full transition-colors duration-300 inline-block"
          >
            Login
          </Link>
        </div>

        {/* Mobile: Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
            {/* Hamburger SVG */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile: Slide-down Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg pb-4">
          <div className="px-6 md:px-10 flex flex-col space-y-4">
            <MobileNavLink href="/why-jfh">Why JFH</MobileNavLink>
            <MobileNavLink href="/why-year-round">Why Year Round</MobileNavLink>
            <MobileNavLink href="/get-started">Get Started</MobileNavLink>
            <Link
              href="/admin/login"
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-full transition-colors duration-300 w-full"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// Helper component for desktop navigation links with hover effect
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative text-gray-700 hover:text-gray-900 font-medium group transition-colors duration-300"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-full h-[2px] bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
    </Link>
  );
}

// Helper component for mobile navigation links
function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block text-gray-700 hover:text-gray-900 font-medium py-2">
      {children}
    </Link>
  );
}