"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedName = localStorage.getItem("userName");
    setUserName(storedName);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    if (pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        const navbarHeight = 80;
        const sectionPosition = section.offsetTop - navbarHeight;
        window.scrollTo({ top: sectionPosition, behavior: "smooth" });
        window.history.pushState({}, "", `#${sectionId}`);
        setMenuOpen(false); // close menu on click (mobile)
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-lg border-b border-white/40 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-bold text-white cursor-pointer">Safe-zone</h1>
        </Link>

        {/* Hamburger Icon (mobile only) */}
        <div className="md:hidden text-white cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </div>

        {/* Menu Items (desktop) */}
        <ul className="hidden md:flex gap-6 text-white items-center">
          <li>
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "hero")}
              className="hover:text-blue-300 cursor-pointer"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className="hover:text-blue-300 cursor-pointer"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#footer"
              onClick={(e) => scrollToSection(e, "footer")}
              className="hover:text-blue-300 cursor-pointer"
            >
              Contact
            </a>
          </li>

          {!userName ? (
            <>
              <li className="hover:text-blue-300 cursor-pointer">
                <Link href="/login">Login</Link>
              </li>
              <li className="hover:text-blue-300 cursor-pointer">
                <Link href="/sign-up">Sign-up</Link>
              </li>
            </>
          ) : (
            <li className="text-white/80">Hello, {userName}</li>
          )}
        </ul>

        {/* Profile Icon (always visible) */}
        {userName && (
          <Link href="/Dashboard" className="ml-4 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-7 hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <ul className="md:hidden bg-white/90 backdrop-blur-md text-black px-6 py-4 space-y-4">
          <li>
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "hero")}
              className="block hover:text-blue-500"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className="block hover:text-blue-500"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#footer"
              onClick={(e) => scrollToSection(e, "footer")}
              className="block hover:text-blue-500"
            >
              Contact
            </a>
          </li>

          {!userName ? (
            <>
              <li>
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <span className="block hover:text-blue-500">Login</span>
                </Link>
              </li>
              <li>
                <Link href="/sign-up" onClick={() => setMenuOpen(false)}>
                  <span className="block hover:text-blue-500">Sign-up</span>
                </Link>
              </li>
            </>
          ) : (
            <li className="text-black/70">Hello, {userName}</li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
