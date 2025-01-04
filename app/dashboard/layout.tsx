'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Book, FileText, GraduationCap, Languages, Clock, Lock, Menu, ChevronDown, Settings, LogOut, PenTool, User } from 'lucide-react'
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FBFF]">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-[#00B0F0]" />
              <span className="text-lg font-semibold text-[#2D3748]">I Notebook</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`flex items-center gap-1 ${pathname.includes('/books') ? 'text-[#00B0F0]' : ''}`}
                >
                  <Book className="w-4 h-4" />
                  Books
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => router.push('/dashboard/books?series=notebook')}>
                  I-Notebook Series
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/books?series=mentor')}>
                  I-Mentor Series
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`flex items-center gap-1 ${pathname.includes('/papers') ? 'text-[#00B0F0]' : ''}`}
                >
                  <FileText className="w-4 h-4" />
                  Question Papers
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => router.push('/dashboard/papers?type=chapter')}>
                  Chapterwise
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/papers?type=weekly')}>
                  Weekly Tests
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/papers?type=monthly')}>
                  Monthly Tests
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/papers?type=supplementary')}>
                  Supplementary
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/papers?type=final')}>
                  Final Exams
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`flex items-center gap-1 ${pathname.includes('/resources') ? 'text-[#00B0F0]' : ''}`}
                >
                  <PenTool className="w-4 h-4" />
                  Resources
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => router.push('/dashboard/resources?type=essays')}>
                  Essays
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/resources?type=timetables')}>
                  Time Tables
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/resources?type=planners')}>
                  Exam Planners
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline-block">{user?.name}</span>
                  <ChevronDown className="w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => router.push('/dashboard/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
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