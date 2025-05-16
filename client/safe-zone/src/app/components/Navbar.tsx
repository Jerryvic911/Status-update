"use client"

import React, { useEffect } from "react"
import Link from "next/link"

const Navbar = () => {
  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      const navbarHeight = 80
      const sectionPosition = section.offsetTop - navbarHeight
      window.scrollTo({ top: sectionPosition, behavior: "smooth" })
      window.history.pushState({}, "", `#${sectionId}`)
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-lg border-b border-white/40 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Safe-zone</h1>
        <ul className="flex gap-6 text-white">
          <li>
            <a href="#hero" onClick={(e) => scrollToSection(e, "hero")} className="hover:text-blue-300 cursor-pointer">
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => scrollToSection(e, "about")} className="hover:text-blue-300 cursor-pointer">
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
          <li className="hover:text-blue-300 cursor-pointer">
            <Link href="/login">Login</Link>
          </li>
          <li className="hover:text-blue-300 cursor-pointer">
            <Link href="/sign-up">Sign-up</Link>
          </li>
          <Link href="/Dashboard">
            <li>
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
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
