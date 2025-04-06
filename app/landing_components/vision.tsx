import React, { useState } from "react";

const COGNIVERSE_VALUES = [
  {
    letter: "C",
    title: "Creativity",
    description:
      "Pushing the boundaries of VR to create cutting-edge training experiences.",
  },
  {
    letter: "O",
    title: "Outreach",
    description:
      "Making VR-based practical training accessible to everyone, everywhere.",
  },
  {
    letter: "G",
    title: "Growth",
    description:
      "Empowering individuals and businesses through immersive learning.",
  },
  {
    letter: "N",
    title: "Nurturing Talent",
    description:
      "Providing opportunities for skill development and innovation.",
  },
  {
    letter: "I",
    title: "Inclusive Access",
    description:
      "Ensuring training is available to all, regardless of background or location.",
  },
  {
    letter: "V",
    title: "Visionary Thinking",
    description: "Anticipating the future of learning and shaping it today.",
  },
  {
    letter: "E",
    title: "Ethical Innovation",
    description:
      "Using technology responsibly to enhance education and healthcare.",
  },
  {
    letter: "R",
    title: "Research-Driven",
    description:
      "Backing our solutions with the latest scientific and industry insights.",
  },
  {
    letter: "S",
    title: "Scalability",
    description:
      "Designing adaptable solutions that grow with learners and organizations.",
  },
  {
    letter: "E",
    title: "Engagement",
    description:
      "Creating immersive, interactive, and effective training experiences.",
  },
];

const Vision = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-4 md:px-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
        Our Vision
      </h2>

      {/* Desktop view: 2-column */}
      <div className="hidden md:grid grid-cols-2 gap-10 max-w-5xl mx-auto">
        {COGNIVERSE_VALUES.map((item, index) => (
          <div key={index} className="flex gap-6 items-start">
            <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-white bg-cyan-500 rounded-full">
              {item.letter}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-600">
                {item.title}
              </h3>
              <p className="text-gray-700 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile view: Accordion */}
      <div className="md:hidden flex flex-col gap-4 max-w-xl mx-auto">
        {COGNIVERSE_VALUES.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-4 py-3 bg-cyan-100 text-cyan-600 font-semibold text-lg"
            >
              <span className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded-full text-sm font-bold">
                  {item.letter}
                </div>
                {item.title}
              </span>
              <span>{activeIndex === index ? "−" : "+"}</span>
            </button>
            {activeIndex === index && (
              <div className="px-4 py-2 text-gray-700 bg-white text-sm">
                {item.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Vision;
