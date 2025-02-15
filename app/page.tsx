"use client";

import { ArrowRight, Brain, Building, Users,Target, Compass, Eye, } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -rotate-45 -right-20 top-20 w-96 h-96 bg-green-700/20 rounded-full blur-3xl"></div>
          <div className="absolute rotate-12 -left-20 bottom-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Transforming Ideas into Intelligent Solutions
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              At Cogniverse, we bridge the gap between human creativity and artificial intelligence, 
              creating solutions that shape the future of technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 items-center gap-8">
            {/* Text Column */}
            <div className="order-2 md:order-1 flex flex-col text-center md:text-left space-y-4 md:space-y-6">
              <h2 className="text-4xl font-extrabold text-white">
                Our Mission
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed">
                To empower businesses and individuals with cutting-edge AI solutions that
                drive innovation, efficiency, and growth in an ever-evolving digital
                landscape. We strive to democratize artificial intelligence, making it
                accessible and beneficial for all sectors of society.
              </p>
            </div>
            {/* Icon Column */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div
                className="
                  rounded-full
                  p-6
                  bg-gradient-to-tr
                  from-green-600
                  via-green-400
                  to-green-500
                  shadow-lg
                  transition
                  duration-300
                  transform
                  hover:scale-105
                  hover:brightness-110
                  cursor-pointer
                "
              >
                <Target className="w-14 h-14 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 items-center gap-8">
            {/* Icon Column (swapped order) */}
            <div className="flex justify-center md:justify-start">
              <div
                className="
                  rounded-full
                  p-6
                  bg-gradient-to-tr
                  from-green-600
                  via-green-400
                  to-green-500
                  shadow-lg
                  transition
                  duration-300
                  transform
                  hover:scale-105
                  hover:brightness-110
                  cursor-pointer
                "
              >
                <Compass className="w-14 h-14 text-white" />
              </div>
            </div>
            {/* Text Column */}
            <div className="flex flex-col text-center md:text-left space-y-4 md:space-y-6">
              <h2 className="text-4xl font-extrabold text-gray-800">
                Our Values
              </h2>
              <ul className="text-gray-700 text-lg leading-relaxed space-y-4 mt-4">
                <li>
                  <strong className="font-semibold">Innovation:</strong> Constantly
                  pushing the boundaries of what's possible with AI.
                </li>
                <li>
                  <strong className="font-semibold">Ethical Development:</strong> Ensuring
                  our AI solutions are responsible and beneficial to society.
                </li>
                <li>
                  <strong className="font-semibold">Collaboration:</strong> Fostering
                  partnerships and knowledge sharing within the AI community.
                </li>
                <li>
                  <strong className="font-semibold">Transparency:</strong> Being open about
                  our processes and the capabilities of our AI.
                </li>
                <li>
                  <strong className="font-semibold">Continuous Learning:</strong> Embracing
                  a culture of perpetual growth and improvement.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 items-center gap-8">
            {/* Text Column */}
            <div className="order-2 md:order-1 flex flex-col text-center md:text-left space-y-4 md:space-y-6">
              <h2 className="text-4xl font-extrabold text-white">
                Our Vision
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed">
                To be the global leader in AI-driven solutions, shaping a future where human
                potential is amplified by intelligent technologies. We envision a world
                where AI seamlessly integrates into every aspect of life, enhancing
                decision-making, creativity, and problem-solving capabilities. Our goal is
                to create a more efficient, sustainable, and innovative world, where the
                synergy between human ingenuity and artificial intelligence leads to
                unprecedented advancements for the betterment of humanity.
              </p>
            </div>
            {/* Icon Column */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end">
              <div
                className="
                  rounded-full
                  p-6
                  bg-gradient-to-tr
                  from-green-600
                  via-green-400
                  to-green-500
                  shadow-lg
                  transition
                  duration-300
                  transform
                  hover:scale-105
                  hover:brightness-110
                  cursor-pointer
                "
              >
                <Eye className="w-14 h-14 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-blue-900 text-center mb-16">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-[3/2] bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}