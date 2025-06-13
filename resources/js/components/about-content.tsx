export function AboutContent() {
  return (
    <section className="mb-16">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold text-stone-900 mb-6">My Background</h2>

          <div className="space-y-4 text-stone-700">
            <p>
              I'm a passionate developer with over 8 years of experience building web applications and digital
              experiences. My journey in technology began with a curiosity about how things work, which eventually led
              me to pursue a career in software development.
            </p>

            <p>
              I specialize in creating clean, functional, and user-centered solutions that solve real problems. My
              approach combines technical expertise with a deep understanding of user needs and business goals.
            </p>

            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
              sharing my knowledge through writing and mentoring.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-stone-900 mb-6">Core Skills</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-stone-900 mb-2">Development</h3>
              <ul className="space-y-1 text-stone-700">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full mr-2"></div>
                  <span>JavaScript & TypeScript</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full mr-2"></div>
                  <span>React & Next.js</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full mr-2"></div>
                  <span>Node.js & Express</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full mr-2"></div>
                  <span>RESTful APIs & GraphQL</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-stone-900 mb-2">Design</h3>
              <ul className="space-y-1 text-stone-700">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full mr-2"></div>
                  <span>UI/UX Principles</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full mr-2"></div>
                  <span>Responsive Design</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full mr-2"></div>
                  <span>Figma & Adobe XD</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-stone-900 mb-2">Other</h3>
              <ul className="space-y-1 text-stone-700">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full mr-2"></div>
                  <span>Project Management</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full mr-2"></div>
                  <span>Team Leadership</span>
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-stone-400 rounded-full mr-2"></div>
                  <span>Technical Writing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
