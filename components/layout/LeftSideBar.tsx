"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navLinks } from '@/lib/constants'
// import React from 'react'

const LeftSideBar = () => {
    const pathname = usePathname();

    return (
        <div className='h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-20 shadow-xl max-lg:hidden'>
        {/* <div 
                className="h-screen sticky p-10 flex flex-col gap-16 bg-gradient-to-b from-white to-blue-100 shadow-xl max-lg:hidden" 
                style={{ boxShadow: "8px 0px 50px rgba(77, 112, 176, 0.2)" }}
            > */
        }
            <Image
                src="/next.svg"
                alt="logo"
                width={150}
                height={70}
                style={{ filter: "invert(15%) sepia(100%) saturate(5000%) hue-rotate(190deg)" }}
            />

            <div className='flex flex-col gap-12'>
                {navLinks.map((link) => (
                    <Link href={link.url} key={link.label} className={`flex gap-4 text-boby-medium ${pathname === link.url ? "text-blue-500" : "text-gray-500"}`}>{link.icon} <p>{link.label}</p></Link>
                ))}
            </div>

            <div className='flex gap-4 text-boby-medium items-center'>
                <UserButton />
                <p>Edit Profile</p>
            </div>
        </div>
    )
}

export default LeftSideBar