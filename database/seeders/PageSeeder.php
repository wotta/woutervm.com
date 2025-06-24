<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create main static pages
        $aboutPage = Page::create([
            'title' => 'About Me',
            'slug' => 'about',
            'excerpt' => 'Learn more about my background, skills, and passion for web development.',
            'content' => $this->getAboutContent(),
            'status' => 'published',
            'template' => 'about',
            'meta_data' => [
                'title' => 'About Wouter van Marrum - Full-Stack Developer',
                'description' => 'Learn more about Wouter van Marrum, a passionate full-stack developer specializing in Laravel, React, and modern web technologies.',
                'keywords' => 'about, wouter van marrum, full-stack developer, web developer, laravel, react',
            ],
            'is_featured' => true,
            'show_in_menu' => true,
            'menu_order' => 1,
            'published_at' => now(),
        ]);

        $portfolioPage = Page::create([
            'title' => 'Portfolio',
            'slug' => 'portfolio',
            'excerpt' => 'Explore my latest projects and see what I\'ve been working on.',
            'content' => $this->getPortfolioContent(),
            'status' => 'published',
            'template' => 'portfolio',
            'meta_data' => [
                'title' => 'Portfolio - Wouter van Marrum',
                'description' => 'Explore the portfolio of Wouter van Marrum, featuring web applications, websites, and digital solutions built with modern technologies.',
                'keywords' => 'portfolio, projects, web development, laravel, react, nextjs',
            ],
            'show_in_menu' => true,
            'menu_order' => 2,
            'published_at' => now(),
        ]);

        $contactPage = Page::create([
            'title' => 'Contact',
            'slug' => 'contact',
            'excerpt' => 'Get in touch for collaborations, questions, or just to say hello.',
            'content' => $this->getContactContent(),
            'status' => 'published',
            'template' => 'contact',
            'meta_data' => [
                'title' => 'Contact Wouter van Marrum',
                'description' => 'Get in touch with Wouter van Marrum for web development projects, collaborations, or consulting opportunities.',
                'keywords' => 'contact, hire, web developer, consultation, collaboration',
            ],
            'show_in_menu' => true,
            'menu_order' => 3,
            'published_at' => now(),
        ]);

        $servicesPage = Page::create([
            'title' => 'Services',
            'slug' => 'services',
            'excerpt' => 'Professional web development services tailored to your needs.',
            'content' => $this->getServicesContent(),
            'status' => 'published',
            'template' => 'default',
            'meta_data' => [
                'title' => 'Web Development Services - Wouter van Marrum',
                'description' => 'Professional web development services including Laravel applications, React frontends, and full-stack solutions.',
                'keywords' => 'services, web development, laravel development, react development, consulting',
            ],
            'show_in_menu' => true,
            'menu_order' => 4,
            'published_at' => now(),
        ]);

        // Create sub-pages for services
        Page::create([
            'title' => 'Laravel Development',
            'slug' => 'laravel-development',
            'excerpt' => 'Custom Laravel applications built for scalability and performance.',
            'content' => $this->getLaravelServicesContent(),
            'status' => 'published',
            'template' => 'default',
            'parent_id' => $servicesPage->id,
            'show_in_menu' => true,
            'menu_order' => 1,
            'published_at' => now(),
        ]);

        Page::create([
            'title' => 'React Development',
            'slug' => 'react-development',
            'excerpt' => 'Modern React applications with excellent user experience.',
            'content' => $this->getReactServicesContent(),
            'status' => 'published',
            'template' => 'default',
            'parent_id' => $servicesPage->id,
            'show_in_menu' => true,
            'menu_order' => 2,
            'published_at' => now(),
        ]);

        // Create a blog index page
        $blogPage = Page::create([
            'title' => 'Blog',
            'slug' => 'blog',
            'excerpt' => 'Thoughts, tutorials, and insights about web development.',
            'content' => '<p>Welcome to my blog where I share insights about web development, tutorials, and thoughts on the latest technologies.</p>',
            'status' => 'published',
            'template' => 'blog',
            'meta_data' => [
                'title' => 'Blog - Wouter van Marrum',
                'description' => 'Web development blog featuring tutorials, insights, and thoughts on modern web technologies.',
                'keywords' => 'blog, web development, tutorials, laravel, react, programming',
            ],
            'show_in_menu' => true,
            'menu_order' => 5,
            'published_at' => now(),
        ]);

        // Create some draft pages
        Page::factory()->count(3)->draft()->create();

        // Create some additional published pages
        Page::factory()->count(5)->published()->create();
    }

    private function getAboutContent(): string
    {
        return '<div class="prose max-w-none">
            <p>Hello! I\'m Wouter van Marrum, a passionate full-stack developer based in the Netherlands. I specialize in creating modern web applications and websites using cutting-edge technologies like Laravel, React, and Next.js.</p>
            
            <h2>My Journey</h2>
            <p>My journey in web development started several years ago when I discovered the power of code to solve real-world problems. Since then, I\'ve been constantly learning and evolving with the ever-changing landscape of web technologies.</p>
            
            <h2>What I Do</h2>
            <p>I focus on building:</p>
            <ul>
                <li>Robust backend systems with Laravel and PHP</li>
                <li>Interactive user interfaces with React and TypeScript</li>
                <li>Full-stack applications that scale</li>
                <li>Clean, maintainable code that stands the test of time</li>
            </ul>
            
            <h2>When I\'m Not Coding</h2>
            <p>When I\'m not behind the keyboard, you can find me exploring new technologies, contributing to open-source projects, or enjoying the beautiful Dutch countryside.</p>
        </div>';
    }

    private function getPortfolioContent(): string
    {
        return '<div class="prose max-w-none">
            <p>Here\'s a showcase of some of my recent projects. Each one represents a unique challenge and learning experience.</p>
            
            <h2>Featured Projects</h2>
            <p>I\'ll be adding detailed case studies of my projects here soon. Stay tuned!</p>
            
            <blockquote>
                <p>"The best way to predict the future is to create it." - Peter Drucker</p>
            </blockquote>
        </div>';
    }

    private function getContactContent(): string
    {
        return '<div class="prose max-w-none">
            <p>I\'m always interested in hearing about new projects and opportunities. Whether you\'re looking for a developer for your next project, need consulting on an existing application, or just want to chat about technology, feel free to reach out.</p>
            
            <h2>Get In Touch</h2>
            <p>The best way to reach me is via email at <a href="mailto:hello@woutervm.com">hello@woutervm.com</a>. I typically respond within 24 hours.</p>
            
            <h2>Let\'s Connect</h2>
            <p>You can also find me on:</p>
            <ul>
                <li><a href="https://github.com/wotta" target="_blank">GitHub</a> - Check out my code</li>
                <li><a href="https://linkedin.com/in/wouter-van-marrum" target="_blank">LinkedIn</a> - Professional network</li>
                <li><a href="https://x.com/wottavm" target="_blank">Twitter/X</a> - Latest thoughts and updates</li>
            </ul>
        </div>';
    }

    private function getServicesContent(): string
    {
        return '<div class="prose max-w-none">
            <p>I offer comprehensive web development services to help bring your digital ideas to life. With expertise in both frontend and backend technologies, I can handle projects from conception to deployment.</p>
            
            <h2>What I Offer</h2>
            <ul>
                <li><strong>Full-Stack Development</strong> - Complete web applications using Laravel and React</li>
                <li><strong>API Development</strong> - RESTful APIs and GraphQL endpoints</li>
                <li><strong>Frontend Development</strong> - Modern, responsive user interfaces</li>
                <li><strong>Backend Development</strong> - Scalable server-side applications</li>
                <li><strong>Consulting</strong> - Technical guidance and architecture planning</li>
            </ul>
            
            <h2>Technologies I Work With</h2>
            <p>My toolkit includes modern, battle-tested technologies that ensure your project is built on solid foundations.</p>
        </div>';
    }

    private function getLaravelServicesContent(): string
    {
        return '<div class="prose max-w-none">
            <p>Laravel is my backend framework of choice for building robust, scalable web applications. With its elegant syntax and powerful features, Laravel enables rapid development without sacrificing code quality.</p>
            
            <h2>Laravel Services I Provide</h2>
            <ul>
                <li>Custom web application development</li>
                <li>API development and integration</li>
                <li>Database design and optimization</li>
                <li>Authentication and authorization systems</li>
                <li>Third-party service integrations</li>
                <li>Performance optimization</li>
                <li>Code review and refactoring</li>
            </ul>
            
            <p>Whether you need a simple website or a complex enterprise application, I can help you leverage Laravel\'s power to achieve your goals.</p>
        </div>';
    }

    private function getReactServicesContent(): string
    {
        return '<div class="prose max-w-none">
            <p>React is my go-to choice for building modern, interactive user interfaces. Combined with TypeScript and modern tooling, React enables me to create applications that are both powerful and maintainable.</p>
            
            <h2>React Services I Provide</h2>
            <ul>
                <li>Single Page Applications (SPAs)</li>
                <li>Progressive Web Apps (PWAs)</li>
                <li>Component library development</li>
                <li>State management implementation</li>
                <li>Performance optimization</li>
                <li>Testing and quality assurance</li>
                <li>Migration from other frameworks</li>
            </ul>
            
            <p>I specialize in creating React applications that are not only functional but also provide excellent user experience and developer experience.</p>
        </div>';
    }
}