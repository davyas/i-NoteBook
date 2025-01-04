'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
  title: string;
  allowDownload?: boolean;
}

export function PDFViewer({ url, title, allowDownload = true }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border-[#00B0F0]/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#2D3748]">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setScale(scale => Math.max(0.5, scale - 0.1))}
            className="border-[#00B0F0]/20 text-[#00B0F0] hover:bg-[#00B0F0]/5"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setScale(scale => Math.min(2, scale + 0.1))}
            className="border-[#00B0F0]/20 text-[#00B0F0] hover:bg-[#00B0F0]/5"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          {allowDownload && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.open(url, '_blank')}
              className="border-[#00B0F0]/20 text-[#00B0F0] hover:bg-[#00B0F0]/5"
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex justify-center bg-[#F8FBFF] rounded-md p-4">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-[600px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00B0F0]"></div>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPageNumber(page => Math.max(1, page - 1))}
            disabled={pageNumber <= 1}
            className="border-[#00B0F0]/20 text-[#00B0F0] hover:bg-[#00B0F0]/5"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-[#4A5568]">
            Page {pageNumber} of {numPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPageNumber(page => Math.min(numPages, page + 1))}
            disabled={pageNumber >= numPages}
            className="border-[#00B0F0]/20 text-[#00B0F0] hover:bg-[#00B0F0]/5"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}