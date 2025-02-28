"use client";

import { FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-purple-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Logo and Description */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">CogniVerse</h2>
                    <p className="text-sm text-gray-300">
                        Redefining medical training through cutting-edge VR technology and innovative solutions.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="about_us/team" className="hover:text-gray-300">Team</a></li>
                        <li><a href="/blog" className="hover:text-gray-300">Blog</a></li>
                        <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Resources</h3>
                    <ul className="space-y-2">
                        <li><a href="/support" className="hover:text-gray-300">Support</a></li>
                        <li><a href="/newsroom" className="hover:text-gray-300">Newsroom</a></li>
                        <li><a href="/privacy-policy" className="hover:text-gray-300">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-gray-300">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Social Media and Subscription */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Get Updates</h3>
                    <form className="flex items-center space-x-2 mb-6">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-grow px-4 py-2 rounded-lg bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring focus:ring-purple-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
                        >
                            Submit
                        </button>
                    </form>

                    {/* Social Media Links */}
                    <div className="flex space-x-4">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                            <FaFacebook size={24} />
                        </a>
                    </div>
                </div>
            </div>

            
            <div className="mt-12 border-t border-purple-700 pt-6 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} CogniVerse. All rights reserved.
            </div>
        </footer>
    );
}
