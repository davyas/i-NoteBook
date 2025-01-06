'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, FileText, BookOpen, ArrowRight } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-[#2D3748] mb-6">Welcome to I Notebook</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/books?series=notebook">
          <Card className="hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center mb-4">
                <Book className="w-6 h-6 text-[#00B0F0]" />
              </div>
              <CardTitle>I-Notebook Series</CardTitle>
              <CardDescription>Access digital copies of I-Notebook series books</CardDescription>
            </CardHeader>
            <CardContent>
              <ArrowRight className="w-5 h-5 text-[#00B0F0]" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/books?series=mentor">
          <Card className="hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center mb-4">
                <Book className="w-6 h-6 text-[#00B0F0]" />
              </div>
              <CardTitle>I-Mentor Series</CardTitle>
              <CardDescription>Access digital copies of I-Mentor series books</CardDescription>
            </CardHeader>
            <CardContent>
              <ArrowRight className="w-5 h-5 text-[#00B0F0]" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/papers?type=chapter">
          <Card className="hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-[#00B0F0]" />
              </div>
              <CardTitle>Question Papers</CardTitle>
              <CardDescription>Access chapterwise and exam question papers</CardDescription>
            </CardHeader>
            <CardContent>
              <ArrowRight className="w-5 h-5 text-[#00B0F0]" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/resources?type=essay">
          <Card className="hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-[#00B0F0]" />
              </div>
              <CardTitle>Essays</CardTitle>
              <CardDescription>Access essay collections for all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <ArrowRight className="w-5 h-5 text-[#00B0F0]" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/resources?type=timetable">
          <Card className="hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-[#00B0F0]" />
              </div>
              <CardTitle>Time Tables</CardTitle>
              <CardDescription>Access exam schedules and time tables</CardDescription>
            </CardHeader>
            <CardContent>
              <ArrowRight className="w-5 h-5 text-[#00B0F0]" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/resources?type=planner">
          <Card className="hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-[#00B0F0]" />
              </div>
              <CardTitle>Planners</CardTitle>
              <CardDescription>Access study and exam preparation planners</CardDescription>
            </CardHeader>
            <CardContent>
              <ArrowRight className="w-5 h-5 text-[#00B0F0]" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}