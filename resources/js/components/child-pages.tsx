import { Link } from '@inertiajs/react';
import { ChevronRight, FileText } from "lucide-react";

interface ChildPage {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
}

interface Props {
  pages: ChildPage[];
  parentSlug: string;
}

export function ChildPages({ pages, parentSlug }: Props) {
  if (pages.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <div className="flex items-center gap-3 mb-8">
        <FileText size={24} className="text-gray-600" />
        <h2 className="text-2xl font-semibold text-gray-900">
          Related Pages
        </h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={route('pages.show', `${parentSlug}/${page.slug}`)}
            className="group block"
          >
            <article className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:bg-white hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {page.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {page.excerpt}
                  </p>
                  
                  <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium text-sm">
                    <span>Learn more</span>
                    <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
      
      {pages.length > 4 && (
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Showing {Math.min(4, pages.length)} of {pages.length} related pages
          </p>
        </div>
      )}
    </section>
  );
}