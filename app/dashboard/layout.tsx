'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/contexts/auth-context'
import { Book, FileText, BookOpen, Settings, LogOut } from 'lucide-react'

const navigation = [
  { name: 'Books', href: '/dashboard/books', icon: Book },
  { name: 'Question Papers', href: '/dashboard/papers', icon: FileText },
  { name: 'Resources', href: '/dashboard/resources', icon: BookOpen },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href="/dashboard" className="text-2xl font-bold text-[#00B0F0]">
                I Notebook
              </Link>
            </div>
            <div className="mt-8 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? 'bg-[#00B0F0]/10 text-[#00B0F0]'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          isActive ? 'text-[#00B0F0]' : 'text-gray-400'
                        }`}
                      />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.school}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={logout}
                >
                  <LogOut className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b w-full">
          <Link href="/dashboard" className="text-2xl font-bold text-[#00B0F0]">
            I Notebook
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 text-gray-500" />
          </Button>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="md:hidden flex overflow-x-auto py-4 px-6 bg-white border-b">
            <nav className="flex space-x-4">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-[#00B0F0]/10 text-[#00B0F0]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon
                      className={`mr-2 h-5 w-5 ${
                        isActive ? 'text-[#00B0F0]' : 'text-gray-400'
                      }`}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}