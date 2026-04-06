"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { getUser } from "@/src/lib/client-auth";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUserState] = useState<any>(null);
  const pathname = usePathname();
  const isPublicAuthPage = pathname === "/login" || pathname === "/create-account";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setUserState(getUser());
  }, [pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-gray-100 bg-white/85 backdrop-blur-md transition-all duration-300 ease-in-out ${
        isScrolled ? "shadow-md shadow-slate-200/70" : "shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 md:py-5 lg:px-16">
        <Link href="/" className="flex items-center gap-3 text-base font-semibold tracking-tight md:text-lg no-underline hover:no-underline">
          <Image
            src="/images/logo.png"
            alt="Just For Hearts"
            width={44}
            height={44}
            className="h-10 md:h-11 w-auto object-contain"
          />
          <span className="logo-text">Just For Hearts</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink href="/why-jfh" pathname={pathname}>Why JFH</NavLink>
          <NavLink href="/why-year-round" pathname={pathname}>Why Year Round</NavLink>
          <NavLink href="/programs" pathname={pathname}>Programs</NavLink>
          <NavLink href="/get-started" pathname={pathname}>Get Started</NavLink>
          {user ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="inline-flex items-center justify-center rounded-lg bg-[#0f766e] px-4 py-2 text-white transition hover:bg-[#115e59]"
            >
              My Profile
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className={
                isPublicAuthPage
                  ? "inline-flex items-center justify-center rounded-lg bg-[#0f766e] px-4 py-2 text-white transition hover:bg-[#115e59]"
                  : "inline-flex items-center justify-center rounded-lg bg-[#0f766e] px-4 py-2 text-white transition hover:bg-[#115e59]"
              }
            >
              Login
            </button>
          )}
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
            <MobileNavLink href="/why-jfh" pathname={pathname}>Why JFH</MobileNavLink>
            <MobileNavLink href="/why-year-round" pathname={pathname}>Why Year Round</MobileNavLink>
            <MobileNavLink href="/programs" pathname={pathname}>Programs</MobileNavLink>
            <MobileNavLink href="/get-started" pathname={pathname}>Get Started</MobileNavLink>
            {user ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[#0f766e] px-4 py-2 text-white transition hover:bg-[#115e59]"
              >
                My Profile
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[#0f766e] px-4 py-2 text-white transition hover:bg-[#115e59]"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`group relative text-sm no-underline transition-colors duration-300 md:text-base hover:no-underline ${
        isActive ? "nav-link nav-link-active" : "nav-link font-normal"
      }`}
    >
      {children}
      <span
        className={`absolute bottom-[-0.35rem] left-0 h-[2px] w-full origin-left bg-[#14b8a6] transition-transform duration-300 ease-out ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      ></span>
    </Link>
  );
}

function MobileNavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block rounded-xl px-3 py-3 text-sm no-underline hover:bg-white hover:no-underline ${
        isActive ? "nav-link nav-link-active" : "nav-link"
      }`}
    >
      {children}
    </Link>
  );
}
