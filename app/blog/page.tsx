"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Enterprise",
    summary: "Exploring how artificial intelligence is reshaping business operations and decision-making processes.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    externalUrl: "https://example.com/blog/ai-enterprise",
  },
  {
    id: 2,
    title: "Machine Learning Best Practices",
    summary: "A comprehensive guide to implementing machine learning solutions in your organization.",
    image: "https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?auto=format&fit=crop&q=80&w=800",
    externalUrl: "https://example.com/blog/ml-best-practices",
  },
  {
    id: 3,
    title: "Digital Transformation Journey",
    summary: "Key insights and strategies for successful digital transformation in modern businesses.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    externalUrl: "https://example.com/blog/digital-transformation",
  },
];

export default function Blog() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white mb-4">Our Blog</h1>
          <p className="text-gray-200">Insights and updates from the Cogniverse team</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-3">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.summary}</p>
                  <Link 
                    href={post.externalUrl}
                    target="_blank"
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                  >
                    Read More
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}