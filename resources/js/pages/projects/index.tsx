import { Head, router, usePage } from "@inertiajs/react"
import { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Search, Tag } from "lucide-react"
import { SharedData } from "@/types"

interface ProjectType {
  id: number
  title: string
  slug: string
  short_description: string
  long_form_content: string
  tags: string[]
  project_image_url?: string
  project_image_thumbnail_url?: string
  live_demo_link?: string
  github_link?: string
  featured: boolean
  visible: boolean
  meta_description?: string
  created_at: string
  updated_at: string
}

interface PageProps extends SharedData {
  projects: ProjectType[]
}

export default function ProjectsIndex() {
  const { projects } = usePage<PageProps>().props
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("sort_order")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Get all unique tags from projects
  const allTags = Array.from(
    new Set(
      projects.flatMap(project => project.tags || [])
    )
  ).sort()

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    router.get(route('projects.index'), {
      search: term || undefined,
      tags: selectedTags.length > 0 ? selectedTags.join(',') : undefined,
      sort_by: sortBy,
      sort_direction: sortDirection,
    }, {
      preserveState: true,
      replace: true,
    })
  }, [selectedTags, sortBy, sortDirection])

  const handleTagFilter = useCallback((tags: string[]) => {
    setSelectedTags(tags)
    router.get(route('projects.index'), {
      search: searchTerm || undefined,
      tags: tags.length > 0 ? tags.join(',') : undefined,
      sort_by: sortBy,
      sort_direction: sortDirection,
    }, {
      preserveState: true,
      replace: true,
    })
  }, [searchTerm, sortBy, sortDirection])

  const handleSort = useCallback((field: string, direction: "asc" | "desc") => {
    setSortBy(field)
    setSortDirection(direction)
    router.get(route('projects.index'), {
      search: searchTerm || undefined,
      tags: selectedTags.length > 0 ? selectedTags.join(',') : undefined,
      sort_by: field,
      sort_direction: direction,
    }, {
      preserveState: true,
      replace: true,
    })
  }, [searchTerm, selectedTags])

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    handleTagFilter(newTags)
  }

  return (
    <>
      <Head title="Projects" />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              My Projects
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive collection of projects showcasing my development skills and creative problem-solving abilities.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* Tag Filters */}
            {allTags.length > 0 && (
              <div className="text-center">
                <div className="inline-flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow-sm border">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium mb-2 w-full">
                    <Tag size={16} />
                    <span>Filter by technology:</span>
                  </div>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sort Options */}
            <div className="flex justify-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value, sortDirection)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="sort_order">Default Order</option>
                <option value="created_at">Creation Date</option>
                <option value="updated_at">Last Updated</option>
              </select>
              <select
                value={sortDirection}
                onChange={(e) => handleSort(sortBy, e.target.value as "asc" | "desc")}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No projects found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:gap-12">
              {projects.map((project) => (
                <Card key={project.id} className={`border-0 shadow-sm ${project.featured ? "md:p-8" : "md:p-6"}`}>
                  <CardContent className="p-6 md:p-0">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                            <button
                              onClick={() => router.visit(route('projects.show', project.slug))}
                              className="hover:text-gray-700 transition-colors"
                            >
                              {project.title}
                            </button>
                          </h2>
                          {project.featured && (
                            <span className="px-2 py-1 text-xs font-medium bg-gray-900 text-white rounded">
                              Featured
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {project.short_description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.visit(route('projects.show', project.slug))}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            Learn More
                          </Button>
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
                            className="aspect-video bg-gray-200 rounded-lg object-cover w-full cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => router.visit(route('projects.show', project.slug))}
                          />
                        ) : (
                          <div
                            className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
                            onClick={() => router.visit(route('projects.show', project.slug))}
                          >
                            <span className="text-gray-500 text-sm">Project Preview</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
