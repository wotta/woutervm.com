<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'E-commerce Platform',
                'slug' => 'e-commerce-platform',
                'short_description' => 'A full-stack e-commerce solution built with Next.js, featuring user authentication, payment processing, and admin dashboard.',
                'long_form_content' => '<h2>Project Overview</h2><p>This comprehensive e-commerce platform was designed to provide a seamless shopping experience for both customers and administrators. Built with modern web technologies, it features a responsive design that works across all devices.</p><h3>Key Features</h3><ul><li>User authentication and authorization</li><li>Product catalog with search and filtering</li><li>Shopping cart and checkout process</li><li>Payment integration with Stripe</li><li>Admin dashboard for inventory management</li><li>Order tracking and management</li></ul><h3>Technical Implementation</h3><p>The platform uses Next.js for the frontend, providing server-side rendering for optimal performance. The backend integrates with Prisma ORM and PostgreSQL for robust data management. Payment processing is handled through Stripe\'s secure API.</p>',
                'tags' => ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
                'live_demo_link' => 'https://example.com/ecommerce-demo',
                'github_link' => 'https://github.com/example/ecommerce-platform',
                'featured' => true,
                'visible' => true,
                'sort_order' => 1,
                'meta_description' => 'Full-stack e-commerce solution with Next.js, TypeScript, and Stripe integration',
            ],
            [
                'title' => 'Task Management App',
                'slug' => 'task-management-app',
                'short_description' => 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
                'long_form_content' => '<h2>About This Project</h2><p>This task management application was created to help teams organize their work efficiently. With real-time collaboration features and an intuitive interface, it makes project management simple and effective.</p><h3>Core Features</h3><ul><li>Real-time task updates using WebSockets</li><li>Drag-and-drop task organization</li><li>Team collaboration and comments</li><li>Project categorization and filtering</li><li>Due date tracking and notifications</li><li>File attachments and sharing</li></ul><h3>Technology Stack</h3><p>Built with React for the frontend and Node.js for the backend, this application uses Socket.io for real-time communication. MongoDB provides flexible data storage, while Tailwind CSS ensures a clean, responsive design.</p>',
                'tags' => ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Tailwind CSS', 'Express'],
                'live_demo_link' => 'https://example.com/task-manager-demo',
                'github_link' => 'https://github.com/example/task-manager',
                'featured' => true,
                'visible' => true,
                'sort_order' => 2,
                'meta_description' => 'Collaborative task management app with real-time updates and team features',
            ],
            [
                'title' => 'Weather Dashboard',
                'slug' => 'weather-dashboard',
                'short_description' => 'A clean, minimalist weather application that provides detailed forecasts and weather data visualization.',
                'long_form_content' => '<h2>Weather Dashboard</h2><p>This weather dashboard provides comprehensive weather information with beautiful data visualization. Designed with a focus on user experience and clean aesthetics.</p><h3>Features</h3><ul><li>Current weather conditions</li><li>7-day weather forecast</li><li>Interactive weather maps</li><li>Location-based weather detection</li><li>Weather data visualization with charts</li><li>Responsive design for all devices</li></ul><h3>Development Details</h3><p>Built with Vue.js for reactive user interfaces and Chart.js for data visualization. Weather data is sourced from the OpenWeather API, providing accurate and up-to-date information.</p>',
                'tags' => ['Vue.js', 'Chart.js', 'OpenWeather API', 'CSS3', 'JavaScript'],
                'live_demo_link' => 'https://example.com/weather-dashboard',
                'github_link' => 'https://github.com/example/weather-dashboard',
                'featured' => false,
                'visible' => true,
                'sort_order' => 3,
                'meta_description' => 'Beautiful weather dashboard with forecasts and data visualization',
            ],
            [
                'title' => 'Portfolio Website',
                'slug' => 'portfolio-website',
                'short_description' => 'A responsive portfolio website showcasing projects and skills. Built with performance and accessibility in mind.',
                'long_form_content' => '<h2>Personal Portfolio</h2><p>This portfolio website serves as a showcase for my development skills and completed projects. Built with modern web standards and optimized for performance.</p><h3>Design Philosophy</h3><ul><li>Clean, minimalist design</li><li>Fast loading times</li><li>Accessibility compliance</li><li>SEO optimization</li><li>Smooth animations and transitions</li><li>Mobile-first responsive design</li></ul><h3>Technical Highlights</h3><p>Developed with React and styled using Tailwind CSS. Framer Motion provides smooth animations, while MDX enables rich content creation. The site achieves excellent performance scores and follows web accessibility guidelines.</p>',
                'tags' => ['React', 'Tailwind CSS', 'Framer Motion', 'MDX', 'Vite'],
                'live_demo_link' => 'https://example.com/portfolio',
                'github_link' => 'https://github.com/example/portfolio',
                'featured' => false,
                'visible' => true,
                'sort_order' => 4,
                'meta_description' => 'Responsive portfolio website with modern design and smooth animations',
            ],
        ];

        foreach ($projects as $projectData) {
            Project::create($projectData);
        }
    }
}
