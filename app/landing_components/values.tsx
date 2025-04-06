import React from "react";

const VALUES = [
  {
    letter: "C",
    title: "Clinical Excellence",
    description:
      "Ensure high-fidelity, evidence-based simulations that improve real-world medical skills.",
  },
  {
    letter: "O",
    title: "Optimized Learning",
    description:
      "Use AI-driven personalization to adapt training to individual needs and skill levels.",
  },
  {
    letter: "G",
    title: "Global Accessibility",
    description:
      "Provide scalable and accessible medical training to professionals worldwide.",
  },
  {
    letter: "N",
    title: "Next-Gen Innovation",
    description:
      "Continuously push the boundaries of AR/VR technology to revolutionize medical education.",
  },
  {
    letter: "I",
    title: "Immersive Collaboration",
    description:
      "Enable teamwork and realistic scenarios to train professionals in effective decision-making.",
  },
];

const ValuesTimeline = () => {
  return (
    <section className="bg-white py-24 px-8">
      <div className="text-center pb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Values</h2>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between gap-16 sm:gap-6 max-w-7xl mx-auto relative">
        {/* Horizontal line for sm+ */}
        <div className="hidden sm:block absolute top-10 left-0 right-0 h-1 bg-gray-100 z-0" />

        {VALUES.map((value, index) => (
          <div
            key={index}
            className="flex sm:flex-col items-start sm:items-center text-left sm:text-center relative z-10"
          >
            {/* Circle Letter */}
            <div className="w-16 h-16 min-w-16 flex items-center justify-center bg-gray-100 text-black text-3xl font-bold rounded-full mb-0 sm:mb-6 sm:mx-auto">
              {value.letter}
            </div>

            {/* Vertical line for mobile */}
            {index !== VALUES.length - 1 && (
              <div className="block sm:hidden h-12 w-0.5 bg-indigo-100 ml-8" />
            )}

            {/* Text */}
            <div className="ml-6 sm:ml-0">
              <h3 className="text-lg font-semibold text-cyan-500">
                {value.title}
              </h3>
              <p className="text-base text-gray-700 mt-2 max-w-sm">
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValuesTimeline;
