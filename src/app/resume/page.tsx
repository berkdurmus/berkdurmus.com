import type { Metadata } from "next";
import { PdfViewer } from "./pdf-viewer";

export const metadata: Metadata = {
  title: "Resume - Berk Durmuş",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Resume
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          This viewer opens directly on the site. Use the buttons to open or
          download.
        </p>

        {/* Mobile actions - ensure controls are visible on small screens */}
        <div className="mt-4 flex items-center justify-end gap-3 sm:hidden">
          <a
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            href="/resume/file"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open PDF
          </a>
          <a
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            href="/resume/file?download=1"
          >
            Download
          </a>
        </div>

        <PdfViewer />

        <div className="mt-4 text-center">
          <a
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            href="/resume/file?download=1"
          >
            Download PDF
          </a>
        </div>
      </div>
    </main>
  );
}
