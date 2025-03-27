"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navLinks } from '@/lib/constants'
// import React from 'react'

const LeftSideBar = () => {
  const currentPath = usePathname()

  return (
    <nav className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
      <Image src="/next.svg" alt="logo" width={150} height={70} />

      <ul className="flex flex-col gap-12">
        {navLinks.map(({ url, icon, label }) => (
          <li key={label}>
            <Link
              href={url}
              className={`flex gap-4 text-boby-medium ${url === "/"
                  ? currentPath === "/" ? "text-blue-600" : "text-gray-500"
                  : currentPath.startsWith(url) ? "text-blue-600" : "text-gray-500"
                }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-4 text-boby-medium items-center">
        <UserButton />
        <span>Edit Profile</span>
      </div>
    </nav>
  )
}

export default LeftSideBar