"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { Link } from "@inertiajs/react"
import { useSettings } from "@/lib/useSettings";

export function Hero() {
  const { get } = useSettings();
  const heroBackground = get('appearance.hero_background');

  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
          {/* Image Section */}
          <div className="relative overflow-hidden bg-gray-100">
            <img src={heroBackground} alt="Profile" className="w-full h-full object-cover object-center" />
          </div>

          {/* Content Section */}
          <div className="flex items-center justify-center px-6 lg:px-12 py-12 bg-gradient-to-br from-stone-50 via-white to-stone-50/80">
            <div className="max-w-lg text-center lg:text-left">
              <div className="mb-8">
                {/* Gradient line replacing the dots */}
                <div className="flex items-center justify-center lg:justify-start mb-6">
                  <div className="h-1 w-16 rounded-full bg-gradient-to-r from-stone-800 via-stone-500 to-stone-300"></div>
                </div>
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-stone-900 mb-6 leading-tight tracking-wide">
                  {get('site.tagline')}
                </h1>
              </div>

              <p className="text-lg lg:text-xl text-stone-700 mb-8 leading-relaxed">
                {get('site.description')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                <Button
                  onClick={scrollToProjects}
                  className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 font-medium"
                >
                  View my work
                </Button>
                <Link href={route('resume')}>
                  <Button
                    variant="outline"
                    className="border-stone-300 text-stone-700 bg-white hover:bg-stone-50 hover:border-stone-400 px-8 py-3 font-medium"
                  >
                    Download CV
                  </Button>
                </Link>
              </div>

              <button
                onClick={scrollToProjects}
                className="animate-bounce text-stone-500 hover:text-stone-700 transition-colors"
                aria-label="Scroll to projects"
              >
                <ArrowDown size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
