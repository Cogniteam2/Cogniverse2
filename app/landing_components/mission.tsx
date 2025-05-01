import React from "react";
import { Users, BrainCircuit, Computer } from "lucide-react";

const Mission = () => {
  return (
    <div>
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-50 via-white to-white"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-6xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700">
              At CogniVerse, we are committed to revolutionizing medical
              education through cutting-edge Virtual Reality (VR) technology.
              Our goal is to elevate the quality of medical training, enhance
              surgical precision, and improve patient care worldwide by creating
              immersive, high-fidelity VR simulations tailored for healthcare
              professionals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <Computer className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Virtual Reality
              </h3>
              <p className="text-gray-600">
                To harness the power of Virtual Reality (VR) to redefine medical
                training.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Accessibility
              </h3>
              <p className="text-gray-600">
                To make high-quality, hands-on learning accessible to healthcare
                professionals worldwide.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-6">
                <BrainCircuit className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                AI-Driven
              </h3>
              <p className="text-gray-600">
                To develop cutting-edge, AI-driven VR simulations that improve
                patient care and safety.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission;
