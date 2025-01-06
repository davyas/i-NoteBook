'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

interface PDFViewerProps {
  url: string
  title: string
}

export function PDFViewer({ url, title }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true)

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
      <div className="relative aspect-[16/9] w-full rounded-lg border bg-muted">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#00B0F0] border-t-transparent"></div>
          </div>
        )}
        <iframe
          src={url}
          className="h-full w-full rounded-lg"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  )
}