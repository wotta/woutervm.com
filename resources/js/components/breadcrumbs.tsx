import { Link } from '@inertiajs/react';
import { ChevronRight, Home } from "lucide-react";

interface Breadcrumb {
  title: string;
  url?: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
}

export function Breadcrumbs({ breadcrumbs }: Props) {
  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-stone-600 mb-6" aria-label="Breadcrumb">
      <Link 
        href={route('home')} 
        className="flex items-center hover:text-stone-900 transition-colors"
      >
        <Home size={16} />
        <span className="sr-only">Home</span>
      </Link>
      
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-stone-400" />
          
          {breadcrumb.url ? (
            <Link 
              href={breadcrumb.url}
              className="hover:text-stone-900 transition-colors"
            >
              {breadcrumb.title}
            </Link>
          ) : (
            <span className="text-stone-900 font-medium">
              {breadcrumb.title}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}