import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, BookOpen, ChevronRight, X } from "lucide-react";

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
  pages: PaginatedPages | Page[];
  query: string;
}

export default function SearchPages({ pages, query }: Props) {
  const [searchQuery, setSearchQuery] = useState(query);
  const [isSearching, setIsSearching] = useState(false);

  const isPaginated = (pages: PaginatedPages | Page[]): pages is PaginatedPages => {
    return 'data' in pages;
  };

  const pageList = isPaginated(pages) ? pages.data : pages;
  const pagination = isPaginated(pages) ? pages : null;

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      router.get(route('pages.search'), 
        { q: searchQuery.trim() }, 
        {
          preserveState: true,
          onFinish: () => setIsSearching(false)
        }
      );
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    router.get(route('pages.search'), {}, { preserveState: true });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <Head>
        <title>{query ? `Search: ${query}` : 'Search Pages'} - Wouter van Marrum</title>
        <meta name="description" content={query ? `Search results for "${query}"` : "Search through all pages and content."} />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-20">
          {/* Header */}
          <div className="w-full bg-stone-50 border-b border-stone-100">
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
              <div className="flex flex-col gap-6">
                <div>
                  <Link 
                    href={route('home')} 
                    className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-4 transition-colors"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    <span>Back to home</span>
                  </Link>
                  <h1 className="text-4xl md:text-5xl font-bold text-stone-900">
                    {query ? 'Search Results' : 'Search Pages'}
                  </h1>
                  {query && (
                    <p className="mt-4 text-lg text-stone-600">
                      Results for "<span className="font-medium">{query}</span>"
                      {pagination && ` (${pagination.total} results)`}
                    </p>
                  )}
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="relative max-w-2xl">
                  <div className="relative">
                    <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search pages..."
                      className="w-full pl-12 pr-12 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isSearching}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSearching || !searchQuery.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    {isSearching ? 'Searching...' : 'Search'}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-6 py-12">
            {query && pageList.length === 0 && (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any pages matching "<span className="font-medium">{query}</span>". 
                  Try adjusting your search terms.
                </p>
                <Button
                  onClick={clearSearch}
                  variant="outline"
                  className="border-gray-300 text-gray-700"
                >
                  Clear search
                </Button>
              </div>
            )}

            {pageList.length > 0 && (
              <section>
                <div className="space-y-6">
                  {pageList.map((page) => (
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
                                {query ? highlightText(page.title, query) : page.title}
                              </h3>
                              <span className="text-sm text-gray-500 capitalize">
                                {page.template}
                              </span>
                              {page.is_featured && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Featured
                                </span>
                              )}
                            </div>
                            
                            <p className="text-gray-600 mb-4 line-clamp-3">
                              {query ? highlightText(page.excerpt, query) : page.excerpt}
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

                {/* Pagination */}
                {pagination && pagination.last_page > 1 && (
                  <div className="mt-12 flex items-center justify-center">
                    <nav className="flex items-center gap-2">
                      {pagination.links.map((link, index) => {
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
              </section>
            )}

            {!query && (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start searching</h3>
                <p className="text-gray-600">
                  Enter a search term above to find pages and content on the site.
                </p>
              </div>
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