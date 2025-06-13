import { ResumeHeader } from "@/components/resume-header"
import { ResumeContent } from "@/components/resume-content"

export const metadata = {
  title: "Wouter van Marrum - Senior Software Developer Resume",
  description:
    "Senior Software Developer with over 5 years of experience in PHP, Laravel, API development, and team leadership.",
  keywords: "Wouter van Marrum, Software Developer, PHP, Laravel, API Development, Senior Developer, Netherlands",
}

export default function Resume() {
  return (
    <div className="min-h-screen bg-white print:bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12 print:px-0 print:py-0">
        <ResumeHeader />
        <ResumeContent />
      </div>
    </div>
  )
}
