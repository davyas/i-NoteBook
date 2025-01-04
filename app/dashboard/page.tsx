'use client';

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Book, FileText, Clock, ChevronRight, Calendar } from 'lucide-react'
import Link from "next/link"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#2D3748]">Welcome back, {user?.name}</h1>
          <p className="text-[#4A5568]">Access all your educational resources in one place</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center mb-4 group-hover:bg-[#00B0F0] transition-colors">
                <Book className="w-6 h-6 text-[#00B0F0] group-hover:text-white" />
              </div>
              <CardTitle>Digital Books</CardTitle>
              <CardDescription>Access your curriculum books online</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#4A5568] hover:text-[#00B0F0]"
                  onClick={() => window.location.href = '/dashboard/books?series=notebook'}
                >
                  <ChevronRight className="mr-2 h-4 w-4" />
                  I-Notebook Series
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#4A5568] hover:text-[#00B0F0]"
                  onClick={() => window.location.href = '/dashboard/books?series=mentor'}
                >
                  <ChevronRight className="mr-2 h-4 w-4" />
                  I-Mentor Series
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center mb-4 group-hover:bg-[#00B0F0] transition-colors">
                <FileText className="w-6 h-6 text-[#00B0F0] group-hover:text-white" />
              </div>
              <CardTitle>Question Papers</CardTitle>
              <CardDescription>Practice with our comprehensive question sets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#4A5568] hover:text-[#00B0F0]"
                  onClick={() => window.location.href = '/dashboard/papers?type=weekly'}
                >
                  <ChevronRight className="mr-2 h-4 w-4" />
                  Weekly Tests
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#4A5568] hover:text-[#00B0F0]"
                  onClick={() => window.location.href = '/dashboard/papers?type=monthly'}
                >
                  <ChevronRight className="mr-2 h-4 w-4" />
                  Monthly Tests
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center mb-4 group-hover:bg-[#00B0F0] transition-colors">
                <Calendar className="w-6 h-6 text-[#00B0F0] group-hover:text-white" />
              </div>
              <CardTitle>Latest Updates</CardTitle>
              <CardDescription>Recently added resources and materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#4A5568] hover:text-[#00B0F0]"
                  onClick={() => window.location.href = '/dashboard/papers'}
                >
                  <ChevronRight className="mr-2 h-4 w-4" />
                  New Question Papers
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-[#4A5568] hover:text-[#00B0F0]"
                  onClick={() => window.location.href = '/dashboard/resources?type=timetables'}
                >
                  <ChevronRight className="mr-2 h-4 w-4" />
                  Updated Time Table
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-[#00B0F0]/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quick Access</CardTitle>
                <Button variant="ghost" size="sm" className="text-[#00B0F0]">
                  View All
                </Button>
              </div>
              <CardDescription>Your recently accessed materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: 'Mathematics Chapter 5',
                    type: 'Question Paper',
                    icon: <FileText className="w-5 h-5 text-[#00B0F0]" />,
                    href: '/dashboard/papers?type=chapter'
                  },
                  {
                    title: 'Science Book',
                    type: 'I-Notebook Series',
                    icon: <Book className="w-5 h-5 text-[#00B0F0]" />,
                    href: '/dashboard/books?series=notebook'
                  },
                  {
                    title: 'Monthly Test - English',
                    type: 'Question Paper',
                    icon: <FileText className="w-5 h-5 text-[#00B0F0]" />,
                    href: '/dashboard/papers?type=monthly'
                  }
                ].map((item, i) => (
                  <Link 
                    key={i} 
                    href={item.href}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#00B0F0]/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-[#2D3748]">{item.title}</h4>
                      <p className="text-sm text-[#4A5568]">{item.type}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#00B0F0]/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Important Updates</CardTitle>
                <Button variant="ghost" size="sm" className="text-[#00B0F0]">
                  View All
                </Button>
              </div>
              <CardDescription>Latest announcements and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: 'Final Exam Schedule',
                    time: '2 hours ago',
                    icon: <Clock className="w-5 h-5 text-[#00B0F0]" />,
                    href: '/dashboard/resources?type=timetables'
                  },
                  {
                    title: 'New Question Papers Added',
                    time: '1 day ago',
                    icon: <FileText className="w-5 h-5 text-[#00B0F0]" />,
                    href: '/dashboard/papers'
                  },
                  {
                    title: 'Updated Study Material',
                    time: '2 days ago',
                    icon: <Book className="w-5 h-5 text-[#00B0F0]" />,
                    href: '/dashboard/books'
                  }
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#00B0F0]/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-[#2D3748]">{item.title}</h4>
                      <p className="text-sm text-[#4A5568]">{item.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}