import React from "react";
import { Activity, UserCheck, Bot, BarChart3, Clock3 } from "lucide-react";

const FEATURES = [
  {
    title: "VR Surgical Training",
    description:
      "Experience clinical environments such as operating theatres, built using validated medical protocols. Used by nurses, surgeons, and educators to reinforce decision-making and procedure flow.",
    icon: Activity,
    bg: "bg-white",
    span: "md:col-span-2",
    compactText: true,
  },
  {
    title: "HalaraXR – Therapeutic VR for Neurodivergent Children",
    description:
      "Access calming, intelligent virtual worlds tailored to the emotional and sensory needs of autistic and ADHD children. Cogniverse integrates the Halara platform to extend care beyond clinics.",
    icon: UserCheck,
    image: "/halara.png", // Replace with your actual image path
    bg: "bg-cyan-50",
    span: "md:row-span-2",
  },
  {
    title: "AI-Powered Avatar Assistant",
    description:
      "Simulations are guided by an intelligent in-VR avatar that assists users throughout training—providing real-time prompts, procedural cues, and support to reinforce learning.",
    icon: Bot,
    bg: "bg-white",
    span: "",
  },
  {
    title: "Real-Time Monitoring & Feedback",
    description:
      "Every session includes real-time tracking of user actions and decisions. Trainers and learners receive detailed feedback reports to improve performance and retention through measurable insights.",
    icon: BarChart3,
    bg: "bg-sky-50",
    span: "",
  },
  {
    title: "Coming Soon",
    description:
      "Exciting new features are in development to take VR-based learning even further. Stay tuned for next-generation tools that deepen realism and expand impact.",
    icon: Clock3,
    bg: "bg-cyan-100",
    span: "md:col-span-2",
    compactText: true,
  },
];

const Solutions = () => {
  return (
    <section className="bg-sky-500 text-white py-24 px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">Our Solutions</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Empowering medical professionals with cutting-edge virtual reality
          technology
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,_1fr)] max-w-7xl mx-auto">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`${feature.bg} ${feature.span} text-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col`}
            >
              <Icon className="text-cyan-600 w-10 h-10 mb-4" />
              <h3 className="text-xl font-semibold text-cyan-600">
                {feature.title}
              </h3>

              {/* Halara image block */}
              {feature.image && (
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-56 h-56 object-cover rounded-xl mt-4 mb-4"
                />
              )}

              <p
                className={`text-sm text-gray-700 leading-relaxed ${
                  feature.compactText ? "mt-2" : "mt-4"
                }`}
              >
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Solutions;
