import { Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function AboutHeader() {
  return (
    <div className="w-full bg-stone-50 border-b border-stone-100">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link href={route('home')} className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-4">
              <ArrowLeft size={16} className="mr-2" />
              <span>Back to home</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900">About Me</h1>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="border-stone-300 text-stone-700">
              Download CV
            </Button>
            <Button className="bg-stone-900 hover:bg-stone-800 text-white">Contact Me</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
