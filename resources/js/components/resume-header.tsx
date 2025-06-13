"use client"

import { Link } from "@inertiajs/react"
import { ArrowLeft, Printer } from "lucide-react"

export function ResumeHeader() {
  return (
    <div className="flex justify-between items-center mb-8 print:hidden">
      <Link href={route('home')} className="inline-flex items-center text-stone-600 hover:text-stone-900">
        <ArrowLeft size={16} className="mr-2" />
        <span>Back to home</span>
      </Link>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800"
      >
        <Printer size={16} className="mr-2" />
        <span>Print Resume</span>
      </button>
    </div>
  )
}
