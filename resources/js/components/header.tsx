import type React from "react"

import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { url } = usePage();

  useEffect(() => {
    const handleScroll = () => {
      if (url !== "/") return

      const sections = ["home", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [url])

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      const handleClickOutside = () => setMobileMenuOpen(false)
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [mobileMenuOpen])

  const scrollToSection = (sectionId: string) => {
    if (url !== "/") {
      window.location.href = `/#${sectionId}`
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent the document click handler from firing
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("home")}
            className="text-xl font-semibold text-gray-900 hover:text-gray-600 transition-colors"
          >
            Wouter van Marrum
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { id: "home", label: "Home" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm transition-colors ${
                  activeSection === item.id ? "text-gray-900 font-medium" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Link href={route('about')} className="text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button onClick={() => scrollToSection("contact")} className="bg-gray-900 hover:bg-gray-800 text-white">
              Contact
            </Button>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Contact Button */}
          <Button
            onClick={() => scrollToSection("contact")}
            className="hidden md:flex bg-gray-900 hover:bg-gray-800 text-white"
          >
            Get in touch
          </Button>
        </nav>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg py-4 px-6 md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col space-y-4">
              {[
                { id: "home", label: "Home" },
                { id: "projects", label: "Projects" },
                { id: "skills", label: "Skills" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-2 text-base ${
                    activeSection === item.id ? "text-gray-900 font-medium" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Link
                href={route('about')}
                className="text-left py-2 text-base text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
