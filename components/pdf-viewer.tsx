'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFViewerProps {
  url: string
  title: string
}

export function PDFViewer({ url, title }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(true)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setIsLoading(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <Button 
          variant="outline" 
          className="border-[#00B0F0] text-[#00B0F0] hover:bg-[#00B0F0]/5"
          onClick={() => window.open(url, '_blank')}
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
      <div className="relative bg-muted rounded-lg border p-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#00B0F0] border-t-transparent"></div>
          </div>
        )}
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex justify-center"
        >
          <Page 
            pageNumber={pageNumber} 
            renderTextLayer={false}
            className="max-w-full"
          />
        </Document>
        {numPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setPageNumber(page => Math.max(1, page - 1))}
              disabled={pageNumber <= 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {pageNumber} of {numPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setPageNumber(page => Math.min(numPages, page + 1))}
              disabled={pageNumber >= numPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}