'use client';

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Book, Search, Download, Eye } from 'lucide-react'
import { PDFViewer } from '@/components/pdf-viewer'

// Sample data - In production, this would come from an API
const SAMPLE_BOOKS = [
  {
    id: '1',
    title: 'Mathematics - Class 10',
    series: 'I-Notebook',
    subject: 'Mathematics',
    class: '10',
    medium: 'English',
    coverUrl: '/placeholder.svg?height=400&width=300',
    pdfUrl: '/sample.pdf'
  },
  {
    id: '2',
    title: 'Science - Class 10',
    series: 'I-Mentor',
    subject: 'Science',
    class: '10',
    medium: 'English',
    coverUrl: '/placeholder.svg?height=400&width=300',
    pdfUrl: '/sample.pdf'
  },
  {
    id: '3',
    title: 'ગણિત - ધોરણ ૧૦',
    series: 'I-Notebook',
    subject: 'Mathematics',
    class: '10',
    medium: 'Gujarati',
    coverUrl: '/placeholder.svg?height=400&width=300',
    pdfUrl: '/sample.pdf'
  },
] as const;

export default function BooksPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedMedium, setSelectedMedium] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedBook, setSelectedBook] = useState<typeof SAMPLE_BOOKS[number] | null>(null)

  // Filter books based on URL params and search/filter criteria
  const series = searchParams.get('series')
  const filteredBooks = SAMPLE_BOOKS.filter(book => {
    return (
      (!series || (series === 'notebook' ? book.series === 'I-Notebook' : book.series === 'I-Mentor')) &&
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedClass || book.class === selectedClass) &&
      (!selectedMedium || book.medium === selectedMedium) &&
      (!selectedSubject || book.subject === selectedSubject)
    );
  });

  return (
    <div className="container py-8">
      {selectedBook ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#2D3748]">{selectedBook.title}</h2>
            <Button 
              variant="outline" 
              onClick={() => setSelectedBook(null)}
              className="border-[#00B0F0] text-[#00B0F0] hover:bg-[#00B0F0]/5"
            >
              Back to Books
            </Button>
          </div>
          <PDFViewer url={selectedBook.pdfUrl} title={selectedBook.title} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-[#2D3748]">
              {series === 'notebook' ? 'I-Notebook Series' : series === 'mentor' ? 'I-Mentor Series' : 'All Books'}
            </h1>
            <div className="flex flex-wrap gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Class" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      Class {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedMedium} onValueChange={setSelectedMedium}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Medium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Gujarati">Gujarati</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-[#00B0F0]/20 focus-visible:ring-[#00B0F0]"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map(book => (
              <Card key={book.id} className="group hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
                <CardHeader>
                  <div className="aspect-[3/4] relative mb-4 rounded-lg overflow-hidden bg-[#00B0F0]/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Book className="w-12 h-12 text-[#00B0F0]" />
                    </div>
                  </div>
                  <CardTitle className="text-[#2D3748]">{book.title}</CardTitle>
                  <CardDescription>
                    {book.series} • {book.medium} • Class {book.class}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-[#00B0F0] to-[#0077A7] hover:opacity-90"
                      onClick={() => setSelectedBook(book)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-[#00B0F0] text-[#00B0F0] hover:bg-[#00B0F0]/5"
                      onClick={() => window.open(book.pdfUrl, '_blank')}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <Book className="w-12 h-12 text-[#00B0F0] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#2D3748]">No books found</h3>
              <p className="text-[#4A5568]">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}