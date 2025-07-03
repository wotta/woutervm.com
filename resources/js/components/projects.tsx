import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { usePage } from "@inertiajs/react"
import { SharedData } from "@/types"

interface ProjectType {
  id: number
  title: string
  slug: string
  short_description: string
  tags: string[]
  project_image_url?: string
  project_image_thumbnail_url?: string
  live_demo_link?: string
  github_link?: string
  featured: boolean
}

interface PageProps extends SharedData {
  projects: ProjectType[]
}

export function Projects() {
  const { projects } = usePage<PageProps>().props

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Selected Projects</h2>
          <p className="text-lg text-gray-600">No projects available at the moment. Check back soon!</p>
        </div>
      </section>
    )
  }

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
          {projects.map((project: ProjectType) => (
            <Card key={project.id} className={`border-0 shadow-sm ${project.featured ? "md:p-8" : "md:p-6"}`}>
              <CardContent className="p-6 md:p-0">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{project.title}</h3>
                      {project.featured && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-900 text-white rounded">Featured</span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{project.short_description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tech: string, techIndex: number) => (
                        <span key={techIndex} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {project.live_demo_link && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          onClick={() => window.open(project.live_demo_link, '_blank')}
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </Button>
                      )}
                      {project.github_link && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          onClick={() => window.open(project.github_link, '_blank')}
                        >
                          <Github size={16} className="mr-2" />
                          Code
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="md:w-64 md:flex-shrink-0">
                    {project.project_image_thumbnail_url ? (
                      <img
                        src={project.project_image_thumbnail_url}
                        alt={project.title}
                        className="aspect-video bg-gray-200 rounded-lg object-cover w-full"
                      />
                    ) : (
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Project Preview</span>
                      </div>
                    )}
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
