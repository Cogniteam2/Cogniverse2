"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled
      ? 'bg-[#1fd1f9]/90 backdrop-blur-md shadow-lg py-3'
      : 'bg-transparent backdrop-blur-none shadow-none py-4'
      }`}>
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            CogniVerse
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-200 hover:text-white font-semibold"
            >
              Home
            </Link>

            <Link
              href="/about_us/technology"
              className="text-gray-200 hover:text-white font-semibold"
            >
              About Us
            </Link>

            <Link
              href="/about_us/team"
              className="text-gray-200 hover:text-white font-semibold"
            >
              Partners
            </Link>

            <Link
              href="/contact"
              className="text-gray-200 hover:text-white font-semibold"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 text-center rounded-xl p-4 bg-gradient-to-br from-[#00a8c9]/90 to-[#24ffe9]/90">
            <Link
              href="/"
              className="block text-gray-200 hover:text-white font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/about"
              className="block text-gray-200 hover:text-white font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>

            <Link
              href="/partners"
              className="block text-gray-200 hover:text-white font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Partners
            </Link>

            <Link
              href="/contact"
              className="block text-gray-200 hover:text-white font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}