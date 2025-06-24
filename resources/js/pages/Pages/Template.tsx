import { Head, Link } from '@inertiajs/react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, ChevronRight, Layers } from "lucide-react";

interface Page {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  template: string;
  featured_image_url?: string;
  is_featured: boolean;
  published_at: string;
}

interface PaginationLink {
  url?: string;
  label: string;
  active: boolean;
}

interface PaginatedPages {
  data: Page[];
  current_page: number;
  last_page: number;
  links: PaginationLink[];
  per_page: number;
  total: number;
}

interface Props {
  pages: PaginatedPages;
  template: string;
}

export default function Template({ pages, template }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTemplateInfo = (templateName: string) => {
    const templates: Record<string, { title: string; description: string; icon: string }> = {
      default: {
        title: 'Default Pages',
        description: 'Standard content pages with default formatting.',
        icon: '📄'
      },
      landing: {
        title: 'Landing Pages',
        description: 'Specialized pages designed for campaigns and conversions.',
        icon: '🚀'
      },
      about: {
        title: 'About Pages',
        description: 'Personal and company information pages.',
        icon: '👋'
      },
      contact: {
        title: 'Contact Pages',
        description: 'Pages with contact forms and information.',
        icon: '📧'
      },
      portfolio: {
        title: 'Portfolio Pages',
        description: 'Showcase of work, projects, and achievements.',
        icon: '💼'
      },
      blog: {
        title: 'Blog Pages',
        description: 'Blog posts and article content.',
        icon: '📝'
      },
      custom: {
        title: 'Custom Pages',
        description: 'Pages with unique layouts and functionality.',
        icon: '⚡'
      }
    };

    return templates[templateName] || {
      title: `${templateName.charAt(0).toUpperCase() + templateName.slice(1)} Pages`,
      description: `Pages using the ${templateName} template.`,
      icon: '📋'
    };
  };

  const templateInfo = getTemplateInfo(template);
  const featuredPages = pages.data.filter(page => page.is_featured);
  const regularPages = pages.data.filter(page => !page.is_featured);

  return (
    <>
      <Head>
        <title>{templateInfo.title} - Wouter van Marrum</title>
        <meta name="description" content={templateInfo.description} />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-20">
          {/* Header */}
          <div className="w-full bg-stone-50 border-b border-stone-100">
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <Link 
                    href={route('pages.index')} 
                    className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-4 transition-colors"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    <span>Back to all pages</span>
                  </Link>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{templateInfo.icon}</span>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Layers size={16} />
                      <span className="capitalize">{template} Template</span>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
                    {templateInfo.title}
                  </h1>
                  
                  <p className="text-lg text-stone-600 mb-4">
                    {templateInfo.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-stone-500">
                    <BookOpen size={16} />
                    <span>{pages.total} page{pages.total !== 1 ? 's' : ''} found</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-6 py-12">
            {pages.data.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">{templateInfo.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
                <p className="text-gray-600 mb-6">
                  There are no pages using the {template} template at the moment.
                </p>
                <Link
                  href={route('pages.index')}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  View all pages
                </Link>
              </div>
            ) : (
              <>
                {/* Featured Pages */}
                {featuredPages.length > 0 && (
                  <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">Featured {templateInfo.title}</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                      {featuredPages.map((page) => (
                        <Link
                          key={page.id}
                          href={route('pages.show', page.slug)}
                          className="group block"
                        >
                          <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                            {page.featured_image_url && (
                              <div className="aspect-video overflow-hidden">
                                <img
                                  src={page.featured_image_url}
                                  alt={page.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}
                            
                            <div className="p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Featured
                                </span>
                                <span className="text-sm text-gray-500">
                                  {templateInfo.icon} {template}
                                </span>
                              </div>
                              
                              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                                {page.title}
                              </h3>
                              
                              <p className="text-gray-600 mb-4 line-clamp-3">
                                {page.excerpt}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                  {formatDate(page.published_at)}
                                </span>
                                
                                <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium">
                                  <span className="text-sm">Read more</span>
                                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Regular Pages */}
                {regularPages.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                      {featuredPages.length > 0 ? `All ${templateInfo.title}` : templateInfo.title}
                    </h2>
                    
                    <div className="space-y-6">
                      {regularPages.map((page) => (
                        <Link
                          key={page.id}
                          href={route('pages.show', page.slug)}
                          className="group block"
                        >
                          <article className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-300">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {page.title}
                                  </h3>
                                  <span className="text-sm text-gray-500">
                                    {templateInfo.icon} {template}
                                  </span>
                                </div>
                                
                                <p className="text-gray-600 mb-4 line-clamp-2">
                                  {page.excerpt}
                                </p>
                                
                                <div className="flex items-center gap-4">
                                  <span className="text-sm text-gray-500">
                                    {formatDate(page.published_at)}
                                  </span>
                                </div>
                              </div>
                              
                              <ChevronRight 
                                size={20} 
                                className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" 
                              />
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Pagination */}
                {pages.last_page > 1 && (
                  <div className="mt-12 flex items-center justify-center">
                    <nav className="flex items-center gap-2">
                      {pages.links.map((link, index) => {
                        if (!link.url) {
                          return (
                            <span
                              key={index}
                              className="px-3 py-2 text-gray-400 cursor-not-allowed"
                              dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                          );
                        }

                        return (
                          <Link
                            key={index}
                            href={link.url}
                            className={`px-3 py-2 rounded-md transition-colors ${
                              link.active
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                          />
                        );
                      })}
                    </nav>
                  </div>
                )}
              </>
            )}

            {/* Back to Top */}
            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                variant="outline"
                className="border-gray-300 text-gray-700"
              >
                Back to top
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}