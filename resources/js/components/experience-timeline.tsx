import { Card, CardContent } from "@/components/ui/card"

const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "2021 - Present",
    description:
      "Lead the development of the company's flagship product, a SaaS platform serving over 50,000 users. Implemented new features, improved performance, and mentored junior developers.",
    technologies: ["React", "TypeScript", "Next.js", "GraphQL"],
    achievements: [
      "Reduced page load time by 40% through code optimization",
      "Led the migration from class components to functional components with hooks",
      "Implemented comprehensive testing strategy, increasing code coverage by 35%",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Digital Solutions Ltd.",
    period: "2018 - 2021",
    description:
      "Worked on multiple client projects, developing responsive web applications and e-commerce solutions. Collaborated closely with designers and backend developers.",
    technologies: ["JavaScript", "React", "Redux", "Node.js"],
    achievements: [
      "Delivered 15+ projects on time and within budget",
      "Created reusable component library that reduced development time by 25%",
      "Received client commendation for exceptional problem-solving skills",
    ],
  },
  {
    title: "Web Developer",
    company: "Creative Agency",
    period: "2016 - 2018",
    description:
      "Developed websites and interactive experiences for various clients in the retail and entertainment industries. Focused on creating engaging, accessible user interfaces.",
    technologies: ["HTML/CSS", "JavaScript", "WordPress", "PHP"],
    achievements: [
      "Built award-winning campaign site that generated 200% increase in client leads",
      "Optimized WordPress themes for performance and SEO",
      "Implemented responsive design principles across all projects",
    ],
  },
]

export function ExperienceTimeline() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-stone-900 mb-8">Professional Experience</h2>

      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <Card key={index} className="border-stone-200 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-3">
                <div className="bg-stone-50 p-6 border-b md:border-b-0 md:border-r border-stone-200">
                  <div className="md:sticky md:top-6">
                    <h3 className="font-semibold text-stone-900 text-lg">{experience.title}</h3>
                    <p className="text-stone-700 font-medium mt-1">{experience.company}</p>
                    <p className="text-stone-500 text-sm mt-1">{experience.period}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-white text-xs font-medium text-stone-700 rounded border border-stone-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 md:col-span-2">
                  <p className="text-stone-700 mb-4">{experience.description}</p>

                  <h4 className="font-medium text-stone-900 mb-2">Key Achievements</h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-stone-400 rounded-full mr-2 mt-2"></div>
                        <span className="text-stone-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
