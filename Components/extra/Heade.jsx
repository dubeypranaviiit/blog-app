"use client";
import { assets } from "@/Assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; 

const Heade = () => {
  const { user, isSignedIn } = useUser(); 
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); 
  const toggleMenu = () => setIsOpen(!isOpen);

  const isAdmin = user?.publicMetadata?.role === "admin"; 

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-blog", label: "Blogs" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
    ...(isAdmin ? [{ href: "/admin/addProduct", label: "Admin" }] : []), 
  ];

  return (
    <header className="w-full py-4 px-3 md:px-12 lg:px-17  bg-white">
      <div className=" w-full flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image
            src={assets.myLogo}
            alt="CurioBlog Logo"
            width={50}
            height={50}
            className="w-10 h-10 object-contain"
          />
        </div>

        <nav className="hidden md:flex bg-gray-100 p-1 rounded-full items-center gap-1 shadow-inner">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                pathname === href
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-600 hover:bg-white hover:text-black"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          {!isSignedIn ? (
            <Link href="/sign-in">
              <button className="flex items-center gap-2 font-medium py-2 px-5 border border-gray-800 text-gray-900 rounded-full shadow hover:bg-gray-100 transition">
                Get Started
                <Image src={assets.arrow} alt="arrow" width={16} height={16} />
              </button>
            </Link>
          ) : (
            <UserButton />
          )}
        </div>

        <button onClick={toggleMenu} className="md:hidden text-black">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 bg-gray-50 rounded-lg p-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                pathname === href
                  ? "bg-white text-black shadow"
                  : "text-gray-700 hover:bg-white"
              }`}
            >
              {label}
            </Link>
          ))}

          {!isSignedIn ? (
            <Link href="/sign-up">
              <button className="mt-2 py-2 w-full border border-gray-700 rounded shadow hover:bg-gray-200 transition">
                Get Started
              </button>
            </Link>
          ) : (
            <UserButton />
          )}
        </div>
      )}
    </header>
  );
};

export default Heade;


