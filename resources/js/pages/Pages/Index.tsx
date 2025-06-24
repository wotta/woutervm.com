import { Head, Link } from '@inertiajs/react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";

interface Page {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  template: string;
  featured_image_url?: string;
  is_featured: boolean;
  published_at: string;
  children: Array<{
    id: number;
    title: string;
    slug: string;
    excerpt: string;
  }>;
}

interface Props {
  pages: Page[];
}

export default function Index({ pages }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredPages = pages.filter(page => page.is_featured);
  const regularPages = pages.filter(page => !page.is_featured);

  return (
    <>
      <Head>
        <title>All Pages - Wouter van Marrum</title>
        <meta name="description" content="Browse all pages and content on the website." />
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
                    href={route('home')} 
                    className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-4 transition-colors"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    <span>Back to home</span>
                  </Link>
                  <h1 className="text-4xl md:text-5xl font-bold text-stone-900">All Pages</h1>
                  <p className="mt-4 text-lg text-stone-600">
                    Browse through all the content and pages available on the site.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Featured Pages */}
            {featuredPages.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Featured Pages</h2>
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
                            <span className="text-sm text-gray-500 capitalize">
                              {page.template}
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
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                {featuredPages.length > 0 ? 'All Pages' : 'Pages'}
              </h2>
              
              {regularPages.length > 0 ? (
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
                              <span className="text-sm text-gray-500 capitalize">
                                {page.template}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {page.excerpt}
                            </p>
                            
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-500">
                                {formatDate(page.published_at)}
                              </span>
                              
                              {page.children.length > 0 && (
                                <span className="flex items-center text-sm text-gray-500">
                                  <BookOpen size={14} className="mr-1" />
                                  {page.children.length} sub-page{page.children.length !== 1 ? 's' : ''}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <ChevronRight 
                            size={20} 
                            className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" 
                          />
                        </div>

                        {/* Child Pages Preview */}
                        {page.children.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {page.children.slice(0, 4).map((child) => (
                                <div
                                  key={child.id}
                                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                  <span className="font-medium">{child.title}</span>
                                  <p className="text-xs text-gray-500 truncate">{child.excerpt}</p>
                                </div>
                              ))}
                            </div>
                            {page.children.length > 4 && (
                              <p className="text-xs text-gray-500 mt-2">
                                +{page.children.length - 4} more sub-pages
                              </p>
                            )}
                          </div>
                        )}
                      </article>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
                  <p className="text-gray-600">There are no pages to display at the moment.</p>
                </div>
              )}
            </section>

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