
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/Assets/assets';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        

        <div className="flex items-center gap-2">
          <Image src={assets.Logo_Icon} alt="Logo" width={180} className='rounded-lg' />
        </div>

    
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} All rights reserved
        </p>

      
        <div className="flex items-center gap-4 text-white text-lg">
          <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
            <FaFacebookF className="hover:text-blue-500 transition duration-300 cursor-pointer" />
          </Link>
          <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
            <FaTwitter className="hover:text-sky-400 transition duration-300 cursor-pointer" />
          </Link>
          <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
            <FaInstagram className="hover:text-pink-500 transition duration-300 cursor-pointer" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
            <FaLinkedinIn className="hover:text-blue-400 transition duration-300 cursor-pointer" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
