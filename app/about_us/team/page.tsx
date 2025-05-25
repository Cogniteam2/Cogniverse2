"use client";

import React from "react";
import Header from "../../../components/header";
import { ChevronRight } from "lucide-react";

export default function Partners() {
    return (
        <div className="min-h-screen bg-white">
            <Header />    

            <section className="relative bg-gradient-to-br from-[#28A0E3] to-[#07ECC6] text-white pt-24 pb-28 px-4 sm:px-6 lg:px-8 -mt-16">
                <div className="max-w-7xl mx-auto relative z-10 pt-16">
                    <div className="max-w-3xl space-y-6">
                        <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                            Strategic Partnerships
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Built With and Backed By <span className="text-[#FFEE58]">Leaders</span> in Healthcare
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                            Collaborating with institutions at the forefront of medical innovation and education.
                        </p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-[#FFEE58]/20 blur-xl"></div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-3xl md:text-xl font-semibold text-[#28A0E3] mb-2 block">
                            Our Network
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Trusted By <span className="text-[#07ECC6]">Leading Institutions</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We partner with world-class institutions to ensure our technology delivers measurable results in real settings.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-center">
                        <div className="bg-gray-50 p-8 rounded-xl flex items-center justify-center h-40">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#28A0E3] mb-2">UCLH</div>
                                <p className="text-gray-600 text-sm">University College London Hospitals</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-xl flex items-center justify-center h-40">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-[#07ECC6] mb-2">UCL</div>
                                <p className="text-gray-600 text-sm">Innovation & Enterprise</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#07ECC6]/10 to-[#28A0E3]/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl md:text-xl font-semibold text-[#07ECC6] mb-4">
                        Get Started
                    </h2>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Let's Shape the Future of <span className="text-[#28A0E3]">Healthcare Training</span> Together
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        We're ready to collaborate with hospitals, universities, and healthcare innovators to build tailored VR solutions that improve training, reduce risk, and support better care.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-6 py-3 bg-[#28A0E3] hover:bg-[#1e8cc8] text-white rounded-lg font-medium transition flex items-center justify-center gap-2">
                            Book a Demo <ChevronRight className="h-4 w-4" />
                        </button>
                        <button className="px-6 py-3 bg-white hover:bg-gray-50 text-[#28A0E3] border-2 border-[#28A0E3] rounded-lg font-medium transition flex items-center justify-center gap-2">
                            Contact Our Team <ChevronRight className="h-4 w-4" />
                        </button>
                        <button className="px-6 py-3 bg-[#07ECC6] hover:bg-[#06d4b1] text-white rounded-lg font-medium transition flex items-center justify-center gap-2">
                            Commission Custom Solution <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}