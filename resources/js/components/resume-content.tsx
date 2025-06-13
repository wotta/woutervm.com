export function ResumeContent() {
  return (
    <div className="space-y-8 print:space-y-6" itemScope itemType="http://schema.org/Person">
      {/* Header */}
      <header className="border-b border-stone-200 pb-6 print:pb-4">
        <h1 className="text-4xl font-bold text-stone-900" itemProp="name">
          Wouter van Marrum
        </h1>
        <p className="text-xl text-stone-600 mt-1" itemProp="jobTitle">
          Senior Software Developer
        </p>
      </header>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:gap-6 print:grid-cols-3">
        {/* Main content */}
        <div className="md:col-span-2 print:col-span-2 space-y-8 print:space-y-6">
          {/* Profile */}
          <section id="profile" aria-labelledby="profile-heading">
            <h2 id="profile-heading" className="text-xl font-semibold text-stone-900 mb-3 print:mb-2">
              Professional Summary
            </h2>
            <p className="text-stone-700" itemProp="description">
              Senior Software Developer with 9+ years building high-performance PHP/Laravel applications. Analytical
              problem-solver who tackles complex technical challenges with innovative solutions. Direct communicator and
              independent thinker who leads teams effectively while prioritizing quality. Combines technical expertise
              with persistence to deliver impactful software that drives business results.
            </p>
          </section>

          {/* Core Technical Skills - Added for ATS optimization */}
          <section id="core-skills" aria-labelledby="core-skills-heading">
            <h2 id="core-skills-heading" className="text-xl font-semibold text-stone-900 mb-3 print:mb-2">
              Core Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-md">PHP</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-md">Laravel</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-md">API Development</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-md">RESTful Services</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-md">MySQL</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-md">PHPUnit</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-md">Test-Driven Development</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-md">Git</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-md">Agile/Scrum</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-md">CI/CD</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-md">System Optimization</span>
              <span className="px-3 py-1 bg-stone-100 text-stone-800 rounded-md">Team Leadership</span>
            </div>
          </section>

          {/* Employment History */}
          <section id="experience" aria-labelledby="experience-heading">
            <h2 id="experience-heading" className="text-xl font-semibold text-stone-900 mb-4 print:mb-3">
              Professional Experience
            </h2>
            <div className="space-y-6 print:space-y-4">
              {/* Job 1 */}
              <div itemScope itemType="http://schema.org/OrganizationRole">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-stone-900">
                    <span itemProp="roleName">Senior Software Developer</span> at{" "}
                    <span itemProp="memberOf" itemScope itemType="http://schema.org/Organization">
                      <span itemProp="name">Kaartje2go</span>
                    </span>
                  </h3>
                  <span className="text-stone-500 text-sm">
                    <time itemProp="startDate" dateTime="2024-03">
                      March 2024
                    </time>{" "}
                    — Present
                  </span>
                </div>
                <p className="text-stone-600 text-sm mb-2">Hybrid - Zwolle, Netherlands</p>
                <div className="ml-4">
                  <p className="font-medium text-stone-800 mb-1">Key Accomplishments:</p>
                  <ul className="list-disc ml-4 text-stone-700 text-sm space-y-1">
                    <li>
                      Introduced an RFM analysis system that calculates customer scores, unlocking smarter, data-driven
                      marketing strategies.
                    </li>
                    <li>Launched a new customer support dashboard that reduced task completion times by 10%.</li>
                  </ul>
                  <p className="font-medium text-stone-800 mt-2 mb-1">Responsibilities:</p>
                  <ul className="list-disc ml-4 text-stone-700 text-sm">
                    <li>
                      Developed a real-time component integrating multiple third-party communication channels,
                      empowering our support team to resolve tickets faster and more effectively.
                    </li>
                    <li>Implemented PHP/Laravel solutions for customer-facing applications and internal tools.</li>
                    <li>Collaborated with cross-functional teams to deliver high-quality software solutions.</li>
                  </ul>
                </div>
              </div>

              {/* Job 2 */}
              <div itemScope itemType="http://schema.org/OrganizationRole">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-stone-900">
                    <span itemProp="roleName">Senior Software Developer</span> at{" "}
                    <span itemProp="memberOf" itemScope itemType="http://schema.org/Organization">
                      <span itemProp="name">Planningsagenda</span>
                    </span>
                  </h3>
                  <span className="text-stone-500 text-sm">
                    <time itemProp="startDate" dateTime="2023-09">
                      September 2023
                    </time>{" "}
                    —
                    <time itemProp="endDate" dateTime="2024-02">
                      February 2024
                    </time>
                  </span>
                </div>
                <p className="text-stone-600 text-sm mb-2">Hybrid, Netherlands</p>
                <div className="ml-4">
                  <ul className="list-disc ml-4 text-stone-700 text-sm space-y-1">
                    <li>Migrated legacy software from an old system to a new one backed by the Laravel framework.</li>
                    <li>Mentored developers in Laravel, providing guidance on best practices and code optimization.</li>
                    <li>
                      Introduced PHPUnit testing practices to the team, increasing test coverage and promoting a
                      test-driven development approach.
                    </li>
                    <li>
                      Implemented system architecture improvements that enhanced application performance and
                      reliability.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Job 3 */}
              <div itemScope itemType="http://schema.org/OrganizationRole">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-stone-900">
                    <span itemProp="roleName">Senior Software Developer</span> at{" "}
                    <span itemProp="memberOf" itemScope itemType="http://schema.org/Organization">
                      <span itemProp="name">Datatrics</span>
                    </span>
                  </h3>
                  <span className="text-stone-500 text-sm">
                    <time itemProp="startDate" dateTime="2021-03">
                      March 2021
                    </time>{" "}
                    —
                    <time itemProp="endDate" dateTime="2023-08">
                      August 2023
                    </time>
                  </span>
                </div>
                <p className="text-stone-600 text-sm mb-2">Hybrid - Enschede, Netherlands</p>
                <div className="ml-4">
                  <p className="font-medium text-stone-800 mb-1">Key Accomplishments:</p>
                  <ul className="list-disc ml-4 text-stone-700 text-sm space-y-1">
                    <li>
                      Led the rewrite of a large, outdated API, improving performance, security, and scalability.
                      Extended it with a comprehensive test suite covering 90%+ of functionality and introduced static
                      analysis checks to maintain high code quality.
                    </li>
                    <li>
                      Replaced significant portions of a legacy system with a more efficient and scalable solution,
                      making the platform faster and more reliable.
                    </li>
                    <li>
                      Mentored colleagues and interns, helping them improve their Laravel skills and grow into stronger
                      developers.
                    </li>
                    <li>
                      Played an active role in hiring by conducting technical interviews, evaluating candidates, and
                      providing feedback to management.
                    </li>
                    <li>
                      Worked closely with offshore teams, ensuring smooth collaboration and knowledge sharing across
                      time zones.
                    </li>
                  </ul>
                  <p className="font-medium text-stone-800 mt-2 mb-1">Responsibilities:</p>
                  <ul className="list-disc ml-4 text-stone-700 text-sm space-y-1">
                    <li>
                      Designed, built, and maintained APIs, always looking for ways to make them more efficient and
                      reliable.
                    </li>
                    <li>
                      Championed best practices in development, code quality, and testing to keep the team delivering
                      high-quality software.
                    </li>
                    <li>
                      Provided guidance and support to junior developers and interns, helping them navigate challenges
                      and grow in their roles.
                    </li>
                    <li>
                      Maintained and improved existing applications, proactively fixing issues and optimizing
                      performance.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Job 4 */}
              <div itemScope itemType="http://schema.org/OrganizationRole">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-stone-900">
                    <span itemProp="roleName">Software Developer</span> at{" "}
                    <span itemProp="memberOf" itemScope itemType="http://schema.org/Organization">
                      <span itemProp="name">Motivo</span>
                    </span>
                  </h3>
                  <span className="text-stone-500 text-sm">
                    <time itemProp="startDate" dateTime="2019">
                      2019
                    </time>{" "}
                    —
                    <time itemProp="endDate" dateTime="2021">
                      2021
                    </time>
                  </span>
                </div>
                <p className="text-stone-600 text-sm mb-2">Hybrid - Zwolle, Netherlands</p>
                <div className="ml-4">
                  <p className="font-medium text-stone-800 mb-1">Key Accomplishments:</p>
                  <ul className="list-disc ml-4 text-stone-700 text-sm space-y-1">
                    <li>
                      Implemented a DTAP (Development, Testing, Acceptance, Production) pipeline, streamlining our
                      development process and boosting deployment efficiency.
                    </li>
                  </ul>
                  <p className="font-medium text-stone-800 mt-2 mb-1">Responsibilities:</p>
                  <ul className="list-disc ml-4 text-stone-700 text-sm space-y-1">
                    <li>
                      Assisted in rolling out Scrum methodology across the organization, fostering a more agile and
                      collaborative work environment.
                    </li>
                    <li>
                      Led technical job interviews, evaluating candidates' skills and expertise to ensure a strong fit
                      for our team and projects.
                    </li>
                    <li>
                      Developed and maintained PHP/Laravel applications with focus on code quality and performance.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Job 5 */}
              <div itemScope itemType="http://schema.org/OrganizationRole">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-stone-900">
                    <span itemProp="roleName">Software Developer</span> at{" "}
                    <span itemProp="memberOf" itemScope itemType="http://schema.org/Organization">
                      <span itemProp="name">DIJ</span>
                    </span>
                  </h3>
                  <span className="text-stone-500 text-sm">
                    <time itemProp="startDate" dateTime="2017-08">
                      August 2017
                    </time>{" "}
                    —
                    <time itemProp="endDate" dateTime="2019-01">
                      January 2019
                    </time>
                  </span>
                </div>
                <p className="text-stone-600 text-sm mb-2">Apeldoorn, Netherlands</p>
                <div className="ml-4">
                  <p className="font-medium text-stone-800 mb-1">Key Accomplishments:</p>
                  <ul className="list-disc ml-4 text-stone-700 text-sm space-y-1">
                    <li>
                      Implemented a comprehensive test suite covering both functional and non-functional requirements,
                      which reduced debugging time and boosted development efficiency.
                    </li>
                    <li>
                      Leveraged Bugsnag for proactive error monitoring, significantly cutting production bugs and
                      ensuring smoother project deployments.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Job 6 */}
              <div itemScope itemType="http://schema.org/OrganizationRole">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-stone-900">
                    <span itemProp="roleName">Software Developer</span> at{" "}
                    <span itemProp="memberOf" itemScope itemType="http://schema.org/Organization">
                      <span itemProp="name">Texemus B.V.</span>
                    </span>
                  </h3>
                  <span className="text-stone-500 text-sm">
                    <time itemProp="startDate" dateTime="2017-01">
                      January 2017
                    </time>{" "}
                    —
                    <time itemProp="endDate" dateTime="2017-07">
                      July 2017
                    </time>
                  </span>
                </div>
                <p className="text-stone-600 text-sm mb-2">Zwolle, Netherlands</p>
                <div className="ml-4">
                  <p className="font-medium text-stone-800 mb-1">Key Accomplishments:</p>
                  <ul className="list-disc ml-4 text-stone-700 text-sm space-y-1">
                    <li>
                      Improved overall software performance and stability by implementing a test suite, significantly
                      reducing bugs and errors.
                    </li>
                  </ul>
                  <p className="font-medium text-stone-800 mt-2 mb-1">Responsibilities:</p>
                  <ul className="list-disc ml-4 text-stone-700 text-sm space-y-1">
                    <li>
                      Mentored interns by providing hands-on Laravel experience, offering practical advice, and
                      encouraging them to take ownership of their growth and development.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          <section id="education" aria-labelledby="education-heading">
            <h2 id="education-heading" className="text-xl font-semibold text-stone-900 mb-3 print:mb-2">
              Education
            </h2>
            <div itemScope itemType="http://schema.org/EducationalOrganization">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-stone-900">
                  <span itemProp="programName">Medewerker ICT</span>,<span itemProp="name"> ROC Ter AA</span>
                </h3>
                <span className="text-stone-500 text-sm">
                  <time itemProp="endDate" dateTime="2009">
                    2009
                  </time>
                </span>
              </div>
              <p className="text-stone-600 text-sm" itemProp="address">
                Helmond, Netherlands
              </p>
            </div>
          </section>

          {/* Certifications */}
          <section id="certifications" aria-labelledby="certifications-heading">
            <h2 id="certifications-heading" className="text-xl font-semibold text-stone-900 mb-3 print:mb-2">
              Licenses & Certifications
            </h2>
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium text-stone-900">Laravel Certified Developer</h3>
                <span className="text-stone-500 text-sm">
                  <time dateTime="2018-07">July 2018</time>
                </span>
              </div>
              <p className="text-stone-600 text-sm">Remote</p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 print:space-y-4">
          {/* Contact Details */}
          <section
            id="contact"
            aria-labelledby="contact-heading"
            className="bg-stone-50 p-4 rounded-md print:bg-stone-50"
          >
            <h2 id="contact-heading" className="text-lg font-semibold text-stone-900 mb-3 print:mb-2">
              Contact Information
            </h2>
            <div className="space-y-2 text-sm">
              <p className="text-stone-700" itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                <span itemProp="streetAddress">Overbrinck 41</span>, <span itemProp="postalCode">8111BS</span>
                <br />
                <span itemProp="addressLocality">Heeten</span>
                <br />
                <span itemProp="addressCountry">Netherlands</span>
              </p>
              <p className="text-stone-700">
                <span itemProp="telephone">+316 39 66 73 74</span>
              </p>
              <p className="text-stone-700">
                <span itemProp="email">li@woutervm.com</span>
              </p>
            </div>
          </section>

          {/* Links */}
          <section id="links" aria-labelledby="links-heading">
            <h2 id="links-heading" className="text-lg font-semibold text-stone-900 mb-3 print:mb-2">
              Professional Profiles
            </h2>
            <div className="space-y-2">
              <a
                href="https://linkedin.com/in/yourprofile"
                className="block text-stone-600 hover:text-stone-900"
                itemProp="sameAs"
              >
                LinkedIn
              </a>
              <a href="https://woutervm.com" className="block text-stone-600 hover:text-stone-900" itemProp="url">
                Personal Website
              </a>
            </div>
          </section>

          {/* Skills */}
          <section id="skills" aria-labelledby="skills-heading">
            <h2 id="skills-heading" className="text-lg font-semibold text-stone-900 mb-3 print:mb-2">
              Professional Skills
            </h2>
            <ul className="space-y-2">
              <li className="text-stone-700" itemProp="knowsAbout">
                PHP / Laravel
              </li>
              <li className="text-stone-700" itemProp="knowsAbout">
                System and Code Optimization
              </li>
              <li className="text-stone-700" itemProp="knowsAbout">
                Testing and Quality Assurance
              </li>
              <li className="text-stone-700" itemProp="knowsAbout">
                Team Collaboration and Leadership
              </li>
              <li className="text-stone-700" itemProp="knowsAbout">
                Integration of Systems and Tools
              </li>
              <li className="text-stone-700" itemProp="knowsAbout">
                Agile (Scrum)
              </li>
            </ul>
          </section>

          {/* Languages */}
          <section id="languages" aria-labelledby="languages-heading">
            <h2 id="languages-heading" className="text-lg font-semibold text-stone-900 mb-3 print:mb-2">
              Languages
            </h2>
            <ul className="space-y-2">
              <li className="text-stone-700">
                <span itemProp="knowsLanguage">Dutch</span> - Native
              </li>
              <li className="text-stone-700">
                <span itemProp="knowsLanguage">English</span> - Professional
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
