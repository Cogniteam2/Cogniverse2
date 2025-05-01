import React from "react";

const COGNIVERSE_VALUES = [
  {
    letter: "C",
    title: "Creativity",
    description:
      "Push the boundaries of VR to create cutting-edge experiences.",
  },
  {
    letter: "O",
    title: "Outreach",
    description:
      "Make VR-based practical training accessible to everyone, everywhere.",
  },
  {
    letter: "G",
    title: "Growth",
    description:
      "Empower individuals and businesses through immersive learning.",
  },
  {
    letter: "N",
    title: "Nurturing Talent",
    description: "Provide opportunities for skill development and innovation.",
  },
  {
    letter: "I",
    title: "Inclusive Access",
    description:
      "Ensure training is available to all, regardless of background or location.",
  },
  {
    letter: "V",
    title: "Visionary Thinking",
    description: "Anticipate the future of learning and shaping it today.",
  },
  {
    letter: "E",
    title: "Ethical Innovation",
    description:
      "Use technology responsibly to enhance education and healthcare.",
  },
  {
    letter: "R",
    title: "Research-Driven",
    description:
      "Back our solutions with the latest scientific and industry insights.",
  },
  {
    letter: "S",
    title: "Scalability",
    description:
      "Design adaptable solutions that grow with learners and organizations.",
  },
  {
    letter: "E",
    title: "Engagement",
    description:
      "Create immersive, interactive, and effective training experiences.",
  },
];

const Vision = () => {
  return (
    <section className="bg-white py-20 px-4 sm:px-8">
      <h2 className="text-6xl font-bold text-center text-gray-800 mb-20">
        Our Vision
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-cyan-300 z-0" />

        <div className="space-y-16">
          {COGNIVERSE_VALUES.map((item, index) => (
            <div key={index} className="relative z-10 flex justify-center">
              <div className="bg-white border shadow-md rounded-xl px-6 py-6 w-full sm:w-3/4 flex flex-col sm:flex-row items-center gap-6">
                {/* Dot on the center line */}
                {/* <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-cyan-500 rounded-full border-4 border-white z-20" /> */}

                {/* Letter */}
                <div className="w-16 h-16 flex items-center justify-center text-4xl font-extrabold text-cyan-600 bg-cyan-100 rounded-lg shadow-inner">
                  {item.letter}
                </div>

                {/* Text */}
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl font-semibold text-cyan-700">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 mt-2 text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vision;
