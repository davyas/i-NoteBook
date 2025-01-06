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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Lock, Search } from 'lucide-react'

// Sample data - replace with your actual data
const papers = [
  {
    id: 1,
    title: "Mathematics Final Exam 2024",
    type: "final",
    subject: "Mathematics",
    class: "10",
    requiresPin: true,
    pdfUrl: "#"
  },
  {
    id: 2,
    title: "Science Chapter 1 Test",
    type: "chapter",
    subject: "Science",
    class: "10",
    requiresPin: false,
    pdfUrl: "#"
  },
  // Add more papers as needed
]

const subjects = ["All Subjects", "Mathematics", "Science", "English", "Social Studies"]
const classes = ["All Classes", "9", "10", "11", "12"]
const types = ["All Types", "chapter", "final"]

export default function PapersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('All Subjects')
  const [selectedClass, setSelectedClass] = useState('All Classes')
  const [selectedType, setSelectedType] = useState('All Types')
  const [pinDialogOpen, setPinDialogOpen] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState<typeof papers[0] | null>(null)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === 'All Subjects' || paper.subject === selectedSubject
    const matchesClass = selectedClass === 'All Classes' || paper.class === selectedClass
    const matchesType = selectedType === 'All Types' || paper.type === selectedType
    return matchesSearch && matchesSubject && matchesClass && matchesType
  })

  const handleOpenPaper = (paper: typeof papers[0]) => {
    if (paper.requiresPin) {
      setSelectedPaper(paper)
      setPinDialogOpen(true)
    } else {
      window.open(paper.pdfUrl, '_blank')
    }
  }

  const handlePinSubmit = () => {
    // Replace with your actual PIN verification logic
    if (pin === '1234') {
      setPinDialogOpen(false)
      setPin('')
      setError('')
      if (selectedPaper) {
        window.open(selectedPaper.pdfUrl, '_blank')
      }
    } else {
      setError('Invalid PIN')
    }
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-[#2D3748]">Question Papers</h1>
          
          {/* Search and Filters */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search papers..."
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

        {/* Papers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.map((paper) => (
            <Card key={paper.id} className="hover:shadow-lg transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#00B0F0]/10">
                    <FileText className="h-5 w-5 text-[#00B0F0]" />
                  </div>
                  {paper.requiresPin && (
                    <Lock className="h-4 w-4 text-[#00B0F0]" />
                  )}
                </div>
                <h3 className="font-semibold mb-2">{paper.title}</h3>
                <div className="flex gap-2 mb-4">
                  <span className="inline-flex items-center rounded-full bg-[#00B0F0]/10 px-2 py-1 text-xs font-medium text-[#00B0F0]">
                    Class {paper.class}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#00B0F0]/10 px-2 py-1 text-xs font-medium text-[#00B0F0]">
                    {paper.subject}
                  </span>
                </div>
                <Button
                  onClick={() => handleOpenPaper(paper)}
                  className="w-full bg-gradient-to-r from-[#00B0F0] to-[#0077A7] hover:opacity-90"
                >
                  View Paper
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No papers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* PIN Dialog */}
        <Dialog open={pinDialogOpen} onOpenChange={setPinDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter PIN</DialogTitle>
              <DialogDescription>
                Please enter the PIN provided by your institution to access this paper.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="border-[#00B0F0]/20 focus-visible:ring-[#00B0F0]"
              />
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <Button
                onClick={handlePinSubmit}
                className="w-full bg-gradient-to-r from-[#00B0F0] to-[#0077A7] hover:opacity-90"
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}