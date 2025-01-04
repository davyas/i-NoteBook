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
import { PenTool, Search, Download, Eye, Calendar, BookOpen, Clock } from 'lucide-react'
import { PDFViewer } from '@/components/pdf-viewer'

// Sample data - In production, this would come from an API
const SAMPLE_RESOURCES = [
  {
    id: '1',
    title: 'Essay Writing Tips - English',
    type: 'essay',
    subject: 'English',
    class: '10',
    medium: 'English',
    pdfUrl: '/sample.pdf',
    uploadDate: '2024-01-01'
  },
  {
    id: '2',
    title: 'Final Exam Time Table 2024',
    type: 'timetable',
    class: '10',
    medium: 'English',
    pdfUrl: '/sample.pdf',
    uploadDate: '2024-01-02'
  },
  {
    id: '3',
    title: 'Exam Preparation Planner',
    type: 'planner',
    class: '10',
    medium: 'English',
    pdfUrl: '/sample.pdf',
    uploadDate: '2024-01-03'
  },
  {
    id: '4',
    title: 'ગુજરાતી નિબંધ લેખન',
    type: 'essay',
    subject: 'Gujarati',
    class: '10',
    medium: 'Gujarati',
    pdfUrl: '/sample.pdf',
    uploadDate: '2024-01-04'
  }
] as const;

export default function ResourcesPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedMedium, setSelectedMedium] = useState('')
  const [selectedResource, setSelectedResource] = useState<typeof SAMPLE_RESOURCES[number] | null>(null)

  // Filter resources based on URL params and search/filter criteria
  const type = searchParams.get('type')
  const filteredResources = SAMPLE_RESOURCES.filter(resource => {
    return (
      (!type || resource.type === type) &&
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedClass || resource.class === selectedClass) &&
      (!selectedMedium || resource.medium === selectedMedium)
    );
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'essay':
        return <PenTool className="w-5 h-5 text-[#00B0F0]" />
      case 'timetable':
        return <Calendar className="w-5 h-5 text-[#00B0F0]" />
      case 'planner':
        return <Clock className="w-5 h-5 text-[#00B0F0]" />
      default:
        return <BookOpen className="w-5 h-5 text-[#00B0F0]" />
    }
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      essay: 'Essay',
      timetable: 'Time Table',
      planner: 'Planner'
    }
    return labels[type as keyof typeof labels]
  }

  return (
    <div className="container py-8">
      {selectedResource ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#2D3748]">{selectedResource.title}</h2>
            <Button 
              variant="outline" 
              onClick={() => setSelectedResource(null)}
              className="border-[#00B0F0] text-[#00B0F0] hover:bg-[#00B0F0]/5"
            >
              Back to Resources
            </Button>
          </div>
          <PDFViewer url={selectedResource.pdfUrl} title={selectedResource.title} />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-[#2D3748]">
              {type ? getTypeLabel(type) : 'All Resources'}
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

              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-[#00B0F0]/20 focus-visible:ring-[#00B0F0]"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map(resource => (
              <Card key={resource.id} className="group hover:shadow-lg transition-all duration-200 border-[#00B0F0]/10">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#00B0F0]/10 flex items-center justify-center">
                      {getTypeIcon(resource.type)}
                    </div>
                    <div className="text-sm text-[#4A5568]">
                      {new Date(resource.uploadDate).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-[#2D3748]">{resource.title}</CardTitle>
                  <CardDescription>
                    {getTypeLabel(resource.type)} • {resource.medium}
                    {resource.subject && ` • ${resource.subject}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-[#00B0F0] to-[#0077A7] hover:opacity-90"
                      onClick={() => setSelectedResource(resource)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-[#00B0F0] text-[#00B0F0] hover:bg-[#00B0F0]/5"
                      onClick={() => window.open(resource.pdfUrl, '_blank')}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-[#00B0F0] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#2D3748]">No resources found</h3>
              <p className="text-[#4A5568]">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}