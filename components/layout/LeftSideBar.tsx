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

      <Image
        src="/log.svg"
        alt="Logo"
        width={150}
        height={70}
        priority
        style={{ height: "auto" }}
      />

      <ul className="flex flex-col ml-[11px] gap-12">
        {navLinks.map(({ url, icon, label }) => (
          <li key={label}>
            <Link
              href={url}
              className={`flex gap-4 font-medium border-b-2 pb-1 ${url === "/"
                  ? currentPath === "/" ? "text-blue-500 border-blue-500" : "text-gray-500 hover:text-black border-transparent hover:border-black"
                  : currentPath.startsWith(url) ? "text-blue-500 border-blue-500" : "text-gray-500 hover:text-black border-transparent hover:border-black"
                }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex gap-4 text-gray-400  items-center">
        <UserButton />
        <span>Edit Profile</span>
      </div>
    </nav>
  )
}

export default LeftSideBar