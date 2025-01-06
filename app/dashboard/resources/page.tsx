'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, FileText, Search, Calendar, ListTodo } from 'lucide-react'

// Sample data - replace with your actual data
const resources = [
  {
    id: 1,
    title: "English Essay Writing Guide",
    type: "essay",
    subject: "English",
    class: "10",
    icon: BookOpen,
    pdfUrl: "#"
  },
  {
    id: 2,
    title: "Final Exam Time Table 2024",
    type: "timetable",
    subject: "All",
    class: "10",
    icon: Calendar,
    pdfUrl: "#"
  },
  {
    id: 3,
    title: "Study Planner Template",
    type: "planner",
    subject: "All",
    class: "All",
    icon: ListTodo,
    pdfUrl: "#"
  },
  // Add more resources as needed
]

const subjects = ["All Subjects", "Mathematics", "Science", "English", "Social Studies"]
const classes = ["All Classes", "9", "10", "11", "12"]
const types = ["All Types", "essay", "timetable", "planner"]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('All Subjects')
  const [selectedClass, setSelectedClass] = useState('All Classes')
  const [selectedType, setSelectedType] = useState('All Types')

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === 'All Subjects' || resource.subject === selectedSubject
    const matchesClass = selectedClass === 'All Classes' || resource.class === selectedClass
    const matchesType = selectedType === 'All Types' || resource.type === selectedType
    return matchesSearch && matchesSubject && matchesClass && matchesType
  })

  const handleOpenResource = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank')
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-[#2D3748]">Learning Resources</h1>
          
          {/* Search and Filters */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-[#00B0F0]/20 focus-visible:ring-[#00B0F0]"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="border-[#00B0F0]/20 focus:ring-[#00B0F0]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="border-[#00B0F0]/20 focus:ring-[#00B0F0]">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="border-[#00B0F0]/20 focus:ring-[#00B0F0]">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls === 'All Classes' ? cls : `Class ${cls}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#00B0F0]/10">
                    <resource.icon className="h-5 w-5 text-[#00B0F0]" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <div className="flex gap-2 mb-4">
                  {resource.class !== 'All' && (
                    <span className="inline-flex items-center rounded-full bg-[#00B0F0]/10 px-2 py-1 text-xs font-medium text-[#00B0F0]">
                      Class {resource.class}
                    </span>
                  )}
                  {resource.subject !== 'All' && (
                    <span className="inline-flex items-center rounded-full bg-[#00B0F0]/10 px-2 py-1 text-xs font-medium text-[#00B0F0]">
                      {resource.subject}
                    </span>
                  )}
                  <span className="inline-flex items-center rounded-full bg-[#00B0F0]/10 px-2 py-1 text-xs font-medium text-[#00B0F0]">
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </span>
                </div>
                <Button
                  onClick={() => handleOpenResource(resource.pdfUrl)}
                  className="w-full bg-gradient-to-r from-[#00B0F0] to-[#0077A7] hover:opacity-90"
                >
                  View Resource
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No resources found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}