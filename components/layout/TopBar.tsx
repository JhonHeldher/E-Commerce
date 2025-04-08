"use client"

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { navLinks } from "@/lib/constants";

const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();

  // Função que verifica se o link está ativo
  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-white shadow-xl lg:hidden">
      <Image
        src="/log.svg"
        alt="logo"
        width={150}
        height={70}
      />

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 font-medium border-b-2 pb-1 ${
              isActive(link.url) 
              ? "text-blue-500 border-blue-500" 
              : "text-gray-500 hover:text-black border-transparent hover:border-black"
            }`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="relative flex gap-4 items-center">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 pr-7 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className={`flex gap-4 font-medium border-b-2 pb-1 focus:outline-none select-none  ${
                  isActive(link.url) 
                  ? "text-blue-500 border-blue-500"  
                  : "text-gray-500 hover:text-black border-transparent hover:border-black"
                }`}
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
