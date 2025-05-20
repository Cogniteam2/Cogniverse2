"use client";

import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl place-items-center mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Brand Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4">CogniVerse</h2>
          <p className="text-sm text-gray-300 max-w-sm">
            Redefining medical training through cutting-edge VR technology and
            innovative solutions.
          </p>
        </div>

        {/* Resources & Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm mb-6">
            <li>
              <a href="/privacy-policy" className="hover:text-gray-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-gray-300">
                Terms of Service
              </a>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://uk.linkedin.com/company/cogniverseuk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <FaFacebook size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} CogniVerse. All rights reserved.
      </div>
    </footer>
  );
}
