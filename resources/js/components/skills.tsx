const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
      "HTML5 & CSS3",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL", "Authentication"],
  },
  {
    title: "Tools & Technologies",
    skills: ["Git & GitHub", "Docker", "AWS", "Vercel", "Figma", "VS Code", "Webpack", "Testing (Jest, Cypress)"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Skills & Technologies</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive toolkit built through years of learning, building, and solving problems.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{category.title}</h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center justify-center md:justify-start">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 hidden md:block" />
                    <span className="text-gray-600">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Always learning and exploring new technologies to stay current with industry trends.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Currently learning", "GraphQL", "Three.js", "Rust"].map((item, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-full text-sm ${
                  index === 0 ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
