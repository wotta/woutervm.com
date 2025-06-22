import { usePage } from '@inertiajs/react'
import { PageProps as InertiaPageProps } from '@inertiajs/core'

export interface SiteConfig {
  name: string
  description?: string
  keywords?: string
  logo?: string
  favicon: string
  tagline?: string
}

export interface Settings {
  [key: string]: any
}

export interface PageProps extends InertiaPageProps {
  settings: Settings
  site: SiteConfig
}

/**
 * Custom hook to access settings from Inertia shared props
 */
export function useSettings() {
  const { props } = usePage<PageProps>()

  return {
    settings: props.settings || {},
    site: props.site || { name: 'Wouter', favicon: '/favicon.ico' },

    /**
     * Get a specific setting value with optional default
     */
    get: (key: string, defaultValue?: any) => {
      return props.settings?.[key] ?? defaultValue
    },

    /**
     * Get site configuration
     */
    getSite: () => props.site,

    /**
     * Check if a setting exists
     */
    has: (key: string) => {
      return key in (props.settings || {})
    },

    /**
     * Get social links (filtered to only include those with values)
     */
    getSocialLinks: () => {
      const settings = props.settings || {}
      return Object.entries(settings)
        .filter(([key, value]) => key.startsWith('social.') && value)
        .reduce((acc, [key, value]) => {
          const platform = key.replace('social.', '')
          acc[platform] = value
          return acc
        }, {} as Record<string, string>)
    },

    /**
     * Get contact information
     */
    getContact: () => {
      const settings = props.settings || {}
      return {
        email: settings['contact.email'],
        phone: settings['contact.phone'],
        address: settings['contact.address'],
      }
    },

    /**
     * Get appearance settings
     */
    getAppearance: () => {
      const settings = props.settings || {}
      return {
        theme: settings['appearance.theme'] || 'auto',
        primaryColor: settings['appearance.primary_color'] || '#3b82f6',
        heroBackground: settings['appearance.hero_background'],
      }
    },

    /**
     * Get feature flags
     */
    getFeatures: () => {
      const settings = props.settings || {}
      return {
        blogEnabled: settings['features.blog_enabled'] ?? true,
        contactFormEnabled: settings['features.contact_form_enabled'] ?? true,
        projectsPerPage: settings['features.projects_per_page'] || 6,
      }
    },

    /**
     * Get skills organized by category
     */
    getSkills: () => {
      const settings = props.settings || {}
      return {
        frontendDevelopment: settings['skills.frontend_development'] || [],
        backendDevelopment: settings['skills.backend_development'] || [],
        toolsTechnologies: settings['skills.tools_technologies'] || [],
        currentlyLearning: settings['skills.currently_learning'] || [],
      }
    }
  }
}

/**
 * Hook specifically for site configuration
 */
export function useSiteConfig() {
  const { site } = useSettings()
  return site
}

/**
 * Hook for checking feature flags
 */
export function useFeatures() {
  const { getFeatures } = useSettings()
  return getFeatures()
}
