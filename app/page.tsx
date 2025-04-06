"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollVid from "./ScrollVid";
import Mission from "./landing_components/mission";
import Values from "./landing_components/values";
import Vision from "./landing_components/vision";
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
      <Mission />

      {/* Values Section */}
      <Values />

      {/* Vision Section */}
      <Vision />

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#00a8c9] text-center mb-16">
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
