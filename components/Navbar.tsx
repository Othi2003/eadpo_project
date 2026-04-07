"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { NAV_LINKS } from "@/constants"

import {
  Navbar as ResizableNavbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar"

const ChurchLogo = () => (
  <Link
    href="/"
    className="relative z-20 flex items-center gap-2 lg:-ml-20 ml-0 px-1 py-1 group"
  >
    <Image
      src="/images/logo.png"
      alt="logo"
      width={50}
      height={50}
      className="drop-shadow-md transition-transform duration-300 group-hover:scale-105"
    />
    <div className="flex flex-col leading-tight " style={{ fontFamily: "Inter, serif" }}>
      <span className="text-[18px] font-extrabold uppercase tracking-wide text-[#1565C0]">
        PEADPO
      </span>
    </div>
  </Link>
)

const Navbar = ({ activeSection }: { activeSection?: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getActiveKey = () => {
    const link = NAV_LINKS.find(l => {
      if (l.href.startsWith("/#")) {
        return pathname === "/" || pathname.startsWith(l.href.split("#")[0] + "/")
      }
      return l.href === pathname || pathname.startsWith(l.href + "/")
    })
    return link?.key || "home"
  }

  const activeKey = activeSection || getActiveKey()

  return (
    <header className="w-full bg-white">
      <ResizableNavbar scrolled={scrolled}>

        {/* Desktop */}
        <NavBody activeSection={activeKey}>
          <ChurchLogo />
          <nav className="hidden lg:flex items-center gap-1 ml-auto">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full hover:bg-blue-50 transition-colors duration-200 ${
                  activeKey === link.key
                    ? "text-[#1565C0] bg-blue-50"
                    : "text-black hover:text-[#1565C0]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </NavBody>

        {/* Mobile */}
        <MobileNav>
          <MobileNavHeader>
            <ChurchLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2 text-base font-medium border-b border-blue-100 text-[#1565C0] hover:text-[#1E88E5] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </MobileNavMenu>
        </MobileNav>

      </ResizableNavbar>
    </header>
  )
}

export default Navbar