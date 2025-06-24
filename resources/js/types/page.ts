export interface Page {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published' | 'private';
  template: string;
  featured_image_url?: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  is_featured: boolean;
  show_in_menu: boolean;
  menu_order: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  settings: Record<string, any>;
  parent?: PageParent;
  children: PageChild[];
}

export interface PageParent {
  id: number;
  title: string;
  slug: string;
}

export interface PageChild {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
}

export interface PageSummary {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  template: string;
  featured_image_url?: string;
  is_featured: boolean;
  published_at: string;
  children?: PageChild[];
}

export interface Breadcrumb {
  title: string;
  url?: string;
}

export interface Navigation {
  id: number;
  title: string;
  slug: string;
  children: NavigationChild[];
}

export interface NavigationChild {
  id: number;
  title: string;
  slug: string;
}

export interface PaginationLink {
  url?: string;
  label: string;
  active: boolean;
}

export interface PaginatedPages<T = PageSummary> {
  data: T[];
  current_page: number;
  last_page: number;
  links: PaginationLink[];
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface PageTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const PAGE_TEMPLATES: Record<string, PageTemplate> = {
  default: {
    id: 'default',
    title: 'Default',
    description: 'Standard content pages with default formatting.',
    icon: '📄'
  },
  landing: {
    id: 'landing',
    title: 'Landing Page',
    description: 'Specialized pages designed for campaigns and conversions.',
    icon: '🚀'
  },
  about: {
    id: 'about',
    title: 'About Page',
    description: 'Personal and company information pages.',
    icon: '👋'
  },
  contact: {
    id: 'contact',
    title: 'Contact Page',
    description: 'Pages with contact forms and information.',
    icon: '📧'
  },
  portfolio: {
    id: 'portfolio',
    title: 'Portfolio',
    description: 'Showcase of work, projects, and achievements.',
    icon: '💼'
  },
  blog: {
    id: 'blog',
    title: 'Blog',
    description: 'Blog posts and article content.',
    icon: '📝'
  },
  custom: {
    id: 'custom',
    title: 'Custom',
    description: 'Pages with unique layouts and functionality.',
    icon: '⚡'
  }
} as const;

export type PageStatus = 'draft' | 'published' | 'private';
export type PageTemplateId = keyof typeof PAGE_TEMPLATES;