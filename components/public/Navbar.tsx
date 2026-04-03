"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-gray-100 bg-white/85 backdrop-blur-md transition-all duration-300 ease-in-out ${
        isScrolled ? "shadow-md shadow-slate-200/70" : "shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 md:py-5 lg:px-16">
        <Link href="/" className="flex items-center gap-3 text-base font-semibold tracking-tight text-slate-800 md:text-lg">
          <Image
            src="/images/logo.png"
            alt="Just For Hearts"
            width={44}
            height={44}
            className="h-10 md:h-11 w-auto object-contain"
          />
          <span>Just For Hearts</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink href="/why-jfh">Why JFH</NavLink>
          <NavLink href="/why-year-round">Why Year Round</NavLink>
          <NavLink href="/programs">Programs</NavLink>
          <NavLink href="/get-started">Get Started</NavLink>
          <Link
            href="/admin/login"
            className="primary-btn text-sm font-medium md:text-base"
          >
            Login
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl border border-gray-100 bg-white p-2 text-slate-800 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md"
            aria-label="Toggle navigation menu"
          >
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

      {isOpen && (
        <div className="border-t border-gray-100 bg-white/95 px-4 pb-4 pt-3 shadow-md md:hidden">
          <div className="flex flex-col gap-2 overflow-hidden rounded-2xl border border-gray-100 bg-slate-50 p-3 shadow-sm">
            <MobileNavLink href="/why-jfh">Why JFH</MobileNavLink>
            <MobileNavLink href="/why-year-round">Why Year Round</MobileNavLink>
            <MobileNavLink href="/programs">Programs</MobileNavLink>
            <MobileNavLink href="/get-started">Get Started</MobileNavLink>
            <Link
              href="/admin/login"
              className="primary-btn mt-2 w-full text-sm font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative text-sm font-medium text-slate-700 transition-colors duration-300 hover:text-teal-600 md:text-base"
    >
      {children}
      <span className="absolute bottom-[-0.35rem] left-0 h-[2px] w-full origin-left scale-x-0 bg-teal-600 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
    </Link>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-white hover:text-teal-600">
      {children}
    </Link>
  );
}
