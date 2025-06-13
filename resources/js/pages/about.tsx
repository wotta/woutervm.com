import { AboutHeader } from "@/components/about-header"
import { AboutContent } from "@/components/about-content"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { Footer } from "@/components/footer"

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHeader />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <AboutContent />
        <ExperienceTimeline />
      </main>
      <Footer />
    </div>
  )
}
