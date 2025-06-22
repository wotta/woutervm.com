import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { useSettings } from "@/lib/useSettings"
import { Head } from "@inertiajs/react"

export default function Home() {
  const { get } = useSettings();

  return (
    <>
    <Head title={get('site.name')}>
      <meta name="description" content={get('site.description')} />
      <meta name="keywords" content={get('site.keywords')} />
      <meta name="author" content={get('site.name')} />
    </Head>
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
    </>
  )
}
