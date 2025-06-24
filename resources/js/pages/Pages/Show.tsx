import { Head, Link } from '@inertiajs/react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Share2, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContent } from "@/components/page-content";
import { ChildPages } from "@/components/child-pages";

interface Page {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  template: string;
  featured_image_url?: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  is_featured: boolean;
  published_at: string;
  settings: Record<string, any>;
  parent?: {
    id: number;
    title: string;
    slug: string;
  };
  children: Array<{
    id: number;
    title: string;
    slug: string;
    excerpt: string;
  }>;
}

interface Breadcrumb {
  title: string;
  url?: string;
}

interface Navigation {
  id: number;
  title: string;
  slug: string;
  children: Array<{
    id: number;
    title: string;
    slug: string;
  }>;
}

interface Props {
  page: Page;
  breadcrumbs: Breadcrumb[];
  navigation: Navigation[];
}

export default function Show({ page, breadcrumbs, navigation }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: page.title,
          text: page.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <Head>
        <title>{page.meta_title}</title>
        <meta name="description" content={page.meta_description} />
        {page.meta_keywords && <meta name="keywords" content={page.meta_keywords} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={page.meta_title} />
        <meta property="og:description" content={page.meta_description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        {page.featured_image_url && (
          <meta property="og:image" content={page.featured_image_url} />
        )}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.meta_title} />
        <meta name="twitter:description" content={page.meta_description} />
        {page.featured_image_url && (
          <meta name="twitter:image" content={page.featured_image_url} />
        )}
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="pt-20">
          {/* Page Header */}
          <PageHeader 
            page={page}
            breadcrumbs={breadcrumbs}
          />
          
          {/* Page Content */}
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Published {formatDate(page.published_at)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span className="capitalize">{page.template} Template</span>
              </div>
              
              {page.is_featured && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Featured
                </span>
              )}
              
              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-gray-900 transition-colors ml-auto"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>

            {/* Main Content */}
            <PageContent content={page.content} settings={page.settings} />

            {/* Child Pages */}
            {page.children.length > 0 && (
              <ChildPages pages={page.children} parentSlug={page.slug} />
            )}

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                {page.parent ? (
                  <Link
                    href={route('pages.show', page.parent.slug)}
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    <span>Back to {page.parent.title}</span>
                  </Link>
                ) : (
                  <Link
                    href={route('home')}
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    <span>Back to home</span>
                  </Link>
                )}

                <Button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  variant="outline"
                  className="border-gray-300 text-gray-700 w-fit"
                >
                  Back to top
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}