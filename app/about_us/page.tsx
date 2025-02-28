"use client";

import Header from "@/components/header";
import Link from "next/link";

const values = [
    { title: "Innovation", description: "Pioneering new solutions in healthcare education.", image: "/images/innovation.jpg" },
    { title: "Excellence", description: "Upholding high standards in VR simulations and their impact.", image: "/images/excellence.jpg" },
    { title: "Collaboration", description: "Partnering with medical and tech experts for collective progress.", image: "/images/collaboration.jpg" },
    { title: "Integrity", description: "Maintaining ethical practices and transparency.", image: "/images/integrity.jpg" },
    { title: "Empathy", description: "Focusing on the needs of professionals and patients.", image: "/images/empathy.jpg" },
    { title: "Accessibility", description: "Ensuring advanced training is available globally.", image: "/images/accessibility.jpg" },
];

export default function AboutPage() {
    return (
        <>
            <Header />
            <div className="bg-[#112240] w-full py-10">
                <main className="pt-24 pb-12 px-6 max-w-5xl mx-auto text-white">
                    <section className="text-center">
                        <h1 className="text-4xl font-bold text-orange-400">About CogniVerse</h1>
                        <p className="mt-4 text-gray-300">Revolutionizing medical education with cutting-edge VR technology.</p>
                    </section>

                    {/* Mission & Vision Section */}
                    <section className="mt-16">
                        <div className="flex flex-col md:flex-row items-center md:justify-between gap-12">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl font-semibold text-purple-300">Our Mission</h2>
                                <p className="mt-3 text-gray-300 leading-relaxed">
                                    CogniVerse™ is committed to revolutionizing medical education with advanced VR technology.
                                    We aim to elevate medical training quality, enhance surgical outcomes, and boost patient satisfaction worldwide.
                                </p>
                            </div>
                            <div className="hidden md:block w-1 h-40 bg-gradient-to-b from-purple-500 to-transparent"></div>
                            <div className="md:w-1/2">
                                <h2 className="text-3xl font-semibold text-purple-300">Our Vision</h2>
                                <p className="mt-3 text-gray-300 leading-relaxed">
                                    Our vision is a future where VR is integral to healthcare education and practice, transforming
                                    medical training and improving surgical techniques globally.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Values Section - Alternating Layout */}
                    <section className="mt-16">
                        <h2 className="text-3xl font-bold text-orange-400 text-center">Our Values</h2>
                        <div className="mt-10 space-y-16">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""} items-center gap-8`}
                                >
                                    <div className="md:w-1/2">
                                        <img src={value.image} alt={value.title} className="rounded-lg shadow-lg w-full h-auto object-cover" />
                                    </div>
                                    <div className="md:w-1/2">
                                        <h3 className="text-2xl font-semibold text-white">{value.title}</h3>
                                        <p className="mt-2 text-gray-300 leading-relaxed">{value.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="mt-16 text-center">
                        <h2 className="text-3xl font-bold text-orange-400">Our Technology - What We Do</h2>
                        <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
                            The future of medical training is here. Experience immersive, risk-free VR-powered simulations designed to revolutionize healthcare education.
                        </p>
                        <Link href="about_us/technology">
                            <button className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition">
                                Learn More →
                            </button>
                        </Link>
                    </section>
                </main>
            </div>
        </>
    );
}
