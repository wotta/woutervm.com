import { Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-600 mb-2">© 2024 Wouter van Marrum. All rights reserved.</p>
            <p className="text-sm text-gray-500">Built with React and Tailwind CSS</p>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
