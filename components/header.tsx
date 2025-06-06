"use client";

import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-purple-800/70 backdrop-blur-md shadow-lg rounded-2xl px-6 py-3 z-50 w-[90%] max-w-4xl">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          CogniVerse
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-200 hover:text-white">Home</Link>

          {/* About Us Dropdown */}
          <div className="relative" onMouseLeave={() => setIsAboutOpen(false)}>
            <button
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              className="flex items-center text-gray-200 hover:text-white"
            >
              About Us
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${isAboutOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {isAboutOpen && (
              <div
                className="absolute top-full left-0 w-48 bg-purple-900/90 backdrop-blur-md rounded-xl shadow-lg py-2"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <Link
                  href="/about_us/team"
                  className="block px-4 py-2 text-gray-200 hover:bg-purple-800/50 hover:text-white"
                >
                  Team
                </Link>
                <Link
                  href="/about_us/technology"
                  className="block px-4 py-2 text-gray-200 hover:bg-purple-800/50 hover:text-white"
                >
                  How We Work
                </Link>
              </div>
            )}
          </div>

          <Link href="/blog" className="text-gray-200 hover:text-white">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-200 hover:text-white">
            Contact
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            Get Started
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
        <div className="md:hidden mt-4 space-y-4 text-center bg-purple-900/90 rounded-xl p-4 shadow-md">
          <Link
            href="/"
            className="block text-gray-200 hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          {/* Mobile About Us Dropdown */}
          <div className="relative">
            <button
              className="flex items-center justify-center w-full text-gray-200 hover:text-white"
              onClick={() => setIsAboutOpen(!isAboutOpen)}
            >
              About Us
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${isAboutOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {isAboutOpen && (
              <div className="mt-2 space-y-2">
                <Link
                  href="/about_us/team"
                  className="block py-2 text-gray-200 hover:text-white pl-4"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAboutOpen(false);
                  }}
                >
                  Team
                </Link>
                <Link
                  href="/about_us/technology"
                  className="block py-2 text-gray-200 hover:text-white pl-4"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsAboutOpen(false);
                  }}
                >
                  How We Work
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className="block text-gray-200 hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="block text-gray-200 hover:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="block px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
