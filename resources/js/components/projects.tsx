import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment processing, and admin dashboard. Implemented responsive design and optimized for performance.",
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with modern React patterns.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Weather Dashboard",
    description:
      "A clean, minimalist weather application that provides detailed forecasts and weather data visualization. Features location-based weather and responsive design.",
    tech: ["Vue.js", "Chart.js", "OpenWeather API", "CSS3"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    title: "Portfolio Website",
    description:
      "A responsive portfolio website showcasing projects and skills. Built with performance and accessibility in mind, featuring smooth animations and clean design.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "MDX"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Selected Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for creating meaningful digital experiences.
          </p>
        </div>

        <div className="grid gap-8 md:gap-12">
          {projects.map((project, index) => (
            <Card key={index} className={`border-0 shadow-sm ${project.featured ? "md:p-8" : "md:p-6"}`}>
              <CardContent className="p-6 md:p-0">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{project.title}</h3>
                      {project.featured && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-900 text-white rounded">Featured</span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <ExternalLink size={16} className="mr-2" />
                        Live Demo
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <Github size={16} className="mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>

                  <div className="md:w-64 md:flex-shrink-0">
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Project Preview</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
