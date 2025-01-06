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
import { Book, Search } from 'lucide-react'

// Sample data - replace with your actual data
const books = [
  {
    id: 1,
    title: "Mathematics Grade 10",
    series: "notebook",
    subject: "Mathematics",
    class: "10",
    coverImage: "/placeholder.svg",
    pdfUrl: "#"
  },
  {
    id: 2,
    title: "Science Grade 10",
    series: "mentor",
    subject: "Science",
    class: "10",
    coverImage: "/placeholder.svg",
    pdfUrl: "#"
  },
  // Add more books as needed
]

const subjects = ["All Subjects", "Mathematics", "Science", "English", "Social Studies"]
const classes = ["All Classes", "9", "10", "11", "12"]
const series = ["All Series", "notebook", "mentor"]

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('All Subjects')
  const [selectedClass, setSelectedClass] = useState('All Classes')
  const [selectedSeries, setSelectedSeries] = useState('All Series')

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === 'All Subjects' || book.subject === selectedSubject
    const matchesClass = selectedClass === 'All Classes' || book.class === selectedClass
    const matchesSeries = selectedSeries === 'All Series' || book.series === selectedSeries
    return matchesSearch && matchesSubject && matchesClass && matchesSeries
  })

  const handleOpenPdf = (pdfUrl: string) => {
    // Implement PDF opening logic here
    window.open(pdfUrl, '_blank')
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-[#2D3748]">Digital Books</h1>
          
          {/* Search and Filters */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-[#00B0F0]/20 focus-visible:ring-[#00B0F0]"
              />
            </div>
            
            <Select value={selectedSeries} onValueChange={setSelectedSeries}>
              <SelectTrigger className="border-[#00B0F0]/20 focus:ring-[#00B0F0]">
                <SelectValue placeholder="Select Series" />
              </SelectTrigger>
              <SelectContent>
                {series.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
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

        {/* Books Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-all duration-200">
              <CardContent className="p-0">
                <div className="aspect-[3/4] relative bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Book className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{book.title}</h3>
                  <div className="flex gap-2 mb-4">
                    <span className="inline-flex items-center rounded-full bg-[#00B0F0]/10 px-2 py-1 text-xs font-medium text-[#00B0F0]">
                      Class {book.class}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-[#00B0F0]/10 px-2 py-1 text-xs font-medium text-[#00B0F0]">
                      {book.subject}
                    </span>
                  </div>
                  <Button
                    onClick={() => handleOpenPdf(book.pdfUrl)}
                    className="w-full bg-gradient-to-r from-[#00B0F0] to-[#0077A7] hover:opacity-90"
                  >
                    Read Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <Book className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No books found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}