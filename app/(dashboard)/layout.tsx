import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'


import LeftSideBar from '@/components/layout/LeftSideBar'
import TopBar from '@/components/layout/TopBar'
import { ToasterProvider } from '@/lib/ToasterProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Commerce - Admin Dashboard',
  description: 'Admin dashboard to manage E-Commerce',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* Adicionamos geistSans.className para FORÇAR a fonte moderna no app inteiro */}
        <body className={`${geistSans.variable} ${geistMono.variable} ${geistSans.className} antialiased`}>
          <ToasterProvider />
          <div className="flex max-lg:flex-col text-grey-1">
            <TopBar />
            <LeftSideBar />
            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}