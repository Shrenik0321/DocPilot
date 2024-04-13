import { ChevronDown, ChevronUp, Loader } from "lucide-react";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useResizeDetector } from "react-resize-detector";

const PDFRenderer = () => {
  const [numPages, setNumPages] = React.useState<number>(1);
  const [currentPage, setCurrentPage] = React.useState<any>(null);

  const { width, ref } = useResizeDetector();

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-zinc-200 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            aria-label="previous-page"
            onClick={() => {
              setCurrentPage((prev: any) => {
                return prev + 1 <= numPages ? prev + 1 : numPages;
              });
            }}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              className="w-12 h-8"
              value={currentPage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const pageNumber = parseInt(e.target.value);
                if (
                  !isNaN(pageNumber) &&
                  pageNumber > 0 &&
                  pageNumber <= numPages
                ) {
                  setCurrentPage(pageNumber);
                } else {
                  setCurrentPage(undefined);
                }
              }}
            />
            <p className="text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{numPages}</span>
            </p>
          </div>

          <Button
            variant="ghost"
            aria-label="next-page"
            onClick={() => {
              setCurrentPage((prev: any) => {
                return prev - 1 > 0 ? prev - 1 : 1;
              });
            }}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 w-full">
        <div
          ref={ref}
          className="max-h-[420px] overflow-y-auto"
          style={{ scrollbarWidth: "thin" }}
        >
          <Document
            loading={
              <div>
                <Loader className="my-24 h-6 w-6 animate-spin" />
              </div>
            }
            onLoadError={() => {
              console.log("Error loading pdf");
            }}
            file="DOC-20231121-WA0003..pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              width={width ? width : 1}
              pageNumber={currentPage ? currentPage : 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
          <p>
            Page {currentPage} of {numPages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PDFRenderer;
