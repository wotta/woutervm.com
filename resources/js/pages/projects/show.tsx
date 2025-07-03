import { Head, Link, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowLeft, Calendar, Tag } from "lucide-react"
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
  meta_description?: string
  created_at: string
  updated_at: string
}

interface PageProps extends SharedData {
  project: ProjectType
}

export default function ProjectShow() {
  const { project } = usePage<PageProps>().props

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <Head title={project.title}>
        {project.meta_description && (
          <meta name="description" content={project.meta_description} />
        )}
        <meta property="og:title" content={project.title} />
        {project.meta_description && (
          <meta property="og:description" content={project.meta_description} />
        )}
        {project.project_image_url && (
          <meta property="og:image" content={project.project_image_url} />
        )}
        <meta property="og:type" content="article" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <div className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Link
              href={route('projects.index')}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Projects</span>
            </Link>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {project.title}
              </h1>
              {project.featured && (
                <span className="px-3 py-1 text-sm font-medium bg-gray-900 text-white rounded">
                  Featured
                </span>
              )}
            </div>

            {project.short_description && (
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {project.short_description}
              </p>
            )}

            {/* Project Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Created {formatDate(project.created_at)}</span>
              </div>
              {project.updated_at !== project.created_at && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Updated {formatDate(project.updated_at)}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={16} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Technologies Used</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              {project.live_demo_link && (
                <Button
                  size="sm"
                  onClick={() => window.open(project.live_demo_link, '_blank')}
                  className="bg-gray-900 hover:bg-gray-800"
                >
                  <ExternalLink size={16} className="mr-2" />
                  View Live Demo
                </Button>
              )}
              {project.github_link && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(project.github_link, '_blank')}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Github size={16} className="mr-2" />
                  View Source Code
                </Button>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {project.project_image_url && (
            <div className="mb-8">
              <img
                src={project.project_image_url}
                alt={project.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Project Content */}
          {project.long_form_content && (
            <div className="prose prose-lg prose-gray max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: project.long_form_content
                }}
              />
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link
                href={route('projects.index')}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={16} />
                <span>Back to Projects</span>
              </Link>

              {(project.live_demo_link || project.github_link) && (
                <div className="flex gap-3">
                  {project.live_demo_link && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.live_demo_link, '_blank')}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </Button>
                  )}
                  {project.github_link && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(project.github_link, '_blank')}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </>
  )
}
