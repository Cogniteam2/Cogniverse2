"use client";

import { ArrowRight, Brain, Building, Users } from "lucide-react";
import Link from "next/link";
import ScrollVid from "./ScrollVid";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section for Mobile & Tablets */}
      <section className="block md:hidden relative bg-gray-800 py-24 pt-[150px]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -rotate-45 -right-20 top-20 w-96 h-96 bg-[#24ffe9]/20 rounded-full blur-3xl"></div>
          <div className="absolute rotate-12 -left-20 bottom-20 w-96 h-96 bg-[#00a8c9]/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white mb-6">
              Transforming Ideas into Intelligent Solutions
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              At Cogniverse, we bridge the gap between human creativity and
              artificial intelligence, creating solutions that shape the future
              of technology.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-[#24ccff]/75 text-white rounded-lg transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ScrollVid for Desktops */}
      <section className="hidden md:block">
        <ScrollVid />
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-white to-white"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700">
              We strive to create innovative AI solutions that empower
              businesses and individuals to achieve their full potential in the
              digital age.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Innovation First
              </h3>
              <p className="text-gray-600">
                Pushing the boundaries of what's possible with AI technology.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Human-Centered
              </h3>
              <p className="text-gray-600">
                Creating solutions that enhance human capabilities, not replace
                them.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Sustainable Growth
              </h3>
              <p className="text-gray-600">
                Building solutions that scale with your business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-blue-900 text-center mb-16">
            Our Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[3/2] bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
