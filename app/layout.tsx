import "../styles/globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-6xl mx-auto p-6">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">SolarCRM</h1>
            <nav className="space-x-4 text-sm">
              <a href="/" className="underline">Dashboard</a>
              <a href="/design" className="underline">Design</a>
              <a href="/leads" className="underline">Leads</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
