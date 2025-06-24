import { Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag, Star, Eye } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface Page {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  template: string;
  featured_image_url?: string;
  is_featured: boolean;
  published_at: string;
  parent?: {
    id: number;
    title: string;
    slug: string;
  };
}

interface Breadcrumb {
  title: string;
  url?: string;
}

interface Props {
  page: Page;
  breadcrumbs: Breadcrumb[];
}

export function PageHeader({ page, breadcrumbs }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTemplateIcon = (template: string) => {
    const icons: Record<string, string> = {
      default: '📄',
      landing: '🚀',
      about: '👋',
      contact: '📧',
      portfolio: '💼',
      blog: '📝',
      custom: '⚡'
    };
    return icons[template] || '📋';
  };

  return (
    <div className="w-full bg-stone-50 border-b border-stone-100">
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        {/* Featured Image */}
        {page.featured_image_url && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-md">
            <img
              src={page.featured_image_url}
              alt={page.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        )}

        {/* Page Info */}
        <div className="flex flex-col gap-6">
          {/* Meta Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <span className="text-lg">{getTemplateIcon(page.template)}</span>
              <span className="capitalize">{page.template} Page</span>
            </div>
            
            {page.is_featured && (
              <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <Star size={14} />
                <span>Featured</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Calendar size={14} />
              <span>{formatDate(page.published_at)}</span>
            </div>
          </div>

          {/* Title and Description */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-4 leading-tight">
              {page.title}
            </h1>
            
            {page.excerpt && (
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-3xl">
                {page.excerpt}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            {page.parent ? (
              <Link
                href={route('pages.show', page.parent.slug)}
                className="inline-flex items-center text-stone-600 hover:text-stone-900 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                <span>Back to {page.parent.title}</span>
              </Link>
            ) : (
              <Link
                href={route('home')}
                className="inline-flex items-center text-stone-600 hover:text-stone-900 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                <span>Back to home</span>
              </Link>
            )}

            <div className="flex gap-3 ml-auto">
              <Button
                onClick={() => {
                  const element = document.getElementById('page-content');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                variant="outline"
                className="border-stone-300 text-stone-700 hover:bg-stone-100"
              >
                <Eye size={16} className="mr-2" />
                Read Article
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}