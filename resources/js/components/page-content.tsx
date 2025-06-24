import { useEffect } from 'react';

interface Props {
  content: string;
  settings?: Record<string, any>;
}

export function PageContent({ content, settings }: Props) {
  useEffect(() => {
    // Add any custom CSS from page settings
    if (settings?.custom_css) {
      const styleElement = document.createElement('style');
      styleElement.textContent = settings.custom_css;
      styleElement.id = 'page-custom-css';
      document.head.appendChild(styleElement);

      return () => {
        const existingStyle = document.getElementById('page-custom-css');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [settings]);

  return (
    <div id="page-content" className="scroll-mt-24">
      <div 
        className={`prose prose-stone max-w-none
          prose-headings:font-semibold 
          prose-headings:text-stone-900
          prose-h1:text-3xl prose-h1:md:text-4xl
          prose-h2:text-2xl prose-h2:md:text-3xl
          prose-h3:text-xl prose-h3:md:text-2xl
          prose-p:text-stone-700 prose-p:leading-relaxed
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6
          prose-blockquote:not-italic prose-blockquote:rounded-r-lg
          prose-code:bg-stone-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-stone-800
          prose-pre:bg-stone-900 prose-pre:text-stone-100
          prose-ul:list-disc prose-ol:list-decimal
          prose-li:text-stone-700
          prose-strong:text-stone-900
          prose-img:rounded-lg prose-img:shadow-md
          ${settings?.show_sidebar === false ? 'max-w-4xl' : ''}
        `}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      {/* Show comments if enabled */}
      {settings?.allow_comments && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Comments</h3>
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">
            <p>Comments functionality would be implemented here.</p>
            <p className="text-sm mt-2">This could integrate with services like Disqus, Utterances, or a custom solution.</p>
          </div>
        </div>
      )}
    </div>
  );
}