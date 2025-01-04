'use client';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Book, FileText, GraduationCap, Languages, Clock, Lock, Menu, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen" style={{
      "--primary": "0 176 240",
      "--primary-foreground": "255 255 255",
      "--secondary": "74 74 74",
      "--secondary-foreground": "255 255 255",
      "--accent": "255 107 0",
      "--accent-foreground": "255 255 255",
      "--background": "255 255 255",
      "--foreground": "74 74 74",
      "--muted": "241 245 249",
      "--muted-foreground": "74 74 74",
    } as React.CSSProperties}>
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <GraduationCap className="h-6 w-6 text-[#00B0F0]" />
          <span className="ml-2 text-lg font-semibold text-[#4A4A4A]">I Notebook</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-[#00B0F0] transition-colors"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-[#00B0F0] transition-colors"
            href="#contact"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 gap-4 p-4 opacity-10">
            {[...Array(48)].map((_, i) => (
              <div key={i} className="h-full">
                <div className="h-full w-full border border-[#00B0F0]/20 rounded-lg"></div>
              </div>
            ))}
          </div>
          <div 
            className="absolute inset-0" 
            style={{
              background: 'linear-gradient(135deg, rgba(0,176,240,0.08) 0%, rgba(255,255,255,0.95) 100%)',
              backdropFilter: 'blur(1px)'
            }}
          />
          <div className="relative container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#2D3748] drop-shadow-sm">
                  Digital Education Portal{" "}
                  <span className="bg-gradient-to-r from-[#0077A7] to-[#00B0F0] bg-clip-text text-transparent">
                    for Schools
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-[#2D3748] text-lg md:text-xl font-semibold">
                  Access digital books, question papers, and educational resources for Class 1 to 10 in
                  English and Gujarati medium.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-[#00B0F0] to-[#0077A7] hover:opacity-90 text-white group shadow-lg"
                  onClick={() => router.push('/login')}
                >
                  Login
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-[#00B0F0] text-[#00B0F0] hover:bg-[#00B0F0]/5 shadow-lg"
                >
                  Request Access
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card className="group hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center mb-4 group-hover:bg-[#00B0F0] transition-colors">
                    <Book className="w-6 h-6 text-[#00B0F0] group-hover:text-white" />
                  </div>
                  <CardTitle>Digital Books</CardTitle>
                  <CardDescription>
                    Access I-Notebook and I-Mentor series books in digital format
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#00B0F0]" />
                      Complete curriculum coverage
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#00B0F0]" />
                      Easy-to-read PDF format
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#00B0F0]" />
                      Available for all subjects
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center mb-4 group-hover:bg-[#00B0F0] transition-colors">
                    <FileText className="w-6 h-6 text-[#00B0F0] group-hover:text-white" />
                  </div>
                  <CardTitle>Question Papers</CardTitle>
                  <CardDescription>
                    Comprehensive question papers with different access levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#00B0F0]" />
                      Chapterwise papers
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#00B0F0]" />
                      Weekly and monthly assessments
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#00B0F0]" />
                      Final exam papers with secure access
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center mb-4 group-hover:bg-[#00B0F0] transition-colors">
                    <Languages className="w-6 h-6 text-[#00B0F0] group-hover:text-white" />
                  </div>
                  <CardTitle>Dual Medium Support</CardTitle>
                  <CardDescription>
                    Resources available in English and Gujarati medium
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#00B0F0]" />
                      Comprehensive coverage in both languages
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#00B0F0]" />
                      Essays and study materials
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="mr-2 h-4 w-4 text-[#00B0F0]" />
                      Subject-specific resources
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#00B0F0]/20 py-6">
        <div className="container flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
          <p className="text-sm text-[#4A5568]">
            © {new Date().getFullYear()} I Notebook. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-[#4A5568] hover:text-[#00B0F0]">
              Help Center
            </Link>
            <Link href="#" className="text-sm text-[#4A5568] hover:text-[#00B0F0]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}