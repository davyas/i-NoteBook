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
  CardFooter,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FileText, Search, Download, Eye, Lock, Calendar } from 'lucide-react'
import { PDFViewer } from '@/components/pdf-viewer'

// Sample data - In production, this would come from an API
const SAMPLE_PAPERS = [
  {
    id: '1',
    title: 'Mathematics Chapter 1 - Algebra',
    type: 'chapter',
    subject: 'Mathematics',
    class: '10',
    medium: 'English',
    pdfUrl: '/sample.pdf',
    wordUrl: '/sample.docx',
    expiryDate: '2024-12-31',
    requiresPin: false
  },
  {
    id: '2',
    title: 'Weekly Test - Science',
    type: 'weekly',
    subject: 'Science',
    class: '10',
    medium: 'English',
    pdfUrl: '/sample.pdf',
    wordUrl: '/sample.docx',
    expiryDate: '2024-01-15',
    requiresPin: false
  },
  {
    id: '3',
    title: 'Final Exam - Mathematics',
    type: 'final',
    subject: 'Mathematics',
    class: '10',
    medium: 'English',
    pdfUrl: '/sample.pdf',
    wordUrl: '/sample.docx',
    expiryDate: '2024-03-15',
    requiresPin: true
  },
] as const;

export default function PapersPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedMedium, setSelectedMedium] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedPaper, setSelectedPaper] = useState<typeof SAMPLE_PAPERS[number] | null>(null)
  const [showPinDialog, setShowPinDialog] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')

  // Filter papers based on URL params and search/filter criteria
  const type = searchParams.get('type')
  const filteredPapers = SAMPLE_PAPERS.filter(paper => {
    return (
      (!type || paper.type === type) &&
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedClass || paper.class === selectedClass) &&
      (!selectedMedium || paper.medium === selectedMedium) &&
      (!selectedSubject || paper.subject === selectedSubject)
    );
  });

  const handlePaperSelect = (paper: typeof SAMPLE_PAPERS[number]) => {
    if (paper.requiresPin) {
      setSelectedPaper(paper)
      setShowPinDialog(true)
      setPin('')
      setPinError('')
    } else {
      setSelectedPaper(paper)
    }
  }

  const handlePinSubmit = () => {
    // In production, this would validate against an API
    if (pin === '1234') {
      setShowPinDialog(false)
    } else {
      setPinError('Invalid PIN')
    }
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      chapter: 'Chapterwise',
      weekly: 'Weekly Test',
      monthly: 'Monthly Test',
      supplementary: 'Supplementary',
      final: 'Final Exam'
    }
    return labels[type as keyof typeof labels]
  }

  return (
    <div className="container py-8">
      {selectedPaper && !showPinDialog ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#2D3748]">{selectedPaper.title}</h2>
            <Button 
              variant="outline" 
              onClick={() => setSelectedPaper(null)}
              className="border-[#00B0F0] text-[#00B0F0] hover:bg-[#00B0F0]/5"
            >
              Back to Papers
            </Button>
          </div>
          <PDFViewer url={selectedPaper.pdfUrl} title={selectedPaper.title} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-[#2D3748]">
              {type ? getTypeLabel(type) : 'All Question Papers'}
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
                  placeholder="Search papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-[#00B0F0]/20 focus-visible:ring-[#00B0F0]"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPapers.map(paper => (
              <Card key={paper.id} className="group hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#00B0F0]" />
                    </div>
                    {paper.requiresPin && (
                      <div className="flex items-center gap-1 text-[#4A5568] text-sm">
                        <Lock className="w-4 h-4" />
                        PIN Protected
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-[#2D3748]">{paper.title}</CardTitle>
                  <CardDescription>
                    {getTypeLabel(paper.type)} • {paper.medium} • Class {paper.class}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-[#4A5568] mb-4">
                    <Calendar className="w-4 h-4" />
                    Expires: {new Date(paper.expiryDate).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-[#00B0F0] to-[#0077A7] hover:opacity-90"
                      onClick={() => handlePaperSelect(paper)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-[#00B0F0] text-[#00B0F0] hover:bg-[#00B0F0]/5"
                      onClick={() => window.open(paper.wordUrl, '_blank')}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPapers.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-[#00B0F0] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#2D3748]">No papers found</h3>
              <p className="text-[#4A5568]">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      <Dialog open={showPinDialog} onOpenChange={setShowPinDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter PIN</DialogTitle>
            <DialogDescription>
              This question paper requires a PIN for access. Please enter the PIN provided by your administrator.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pin">PIN</Label>
              <Input
                id="pin"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="border-[#00B0F0]/20 focus-visible:ring-[#00B0F0]"
                placeholder="Enter PIN"
              />
              {pinError && (
                <p className="text-red-500 text-sm">{pinError}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPinDialog(false)
                  setSelectedPaper(null)
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-[#00B0F0] to-[#0077A7] hover:opacity-90"
                onClick={handlePinSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}