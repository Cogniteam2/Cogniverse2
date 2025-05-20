import React from "react";

const sections = [
  {
    title: "Clinical Excellence",
    description:
      "Ensure high-fidelity, evidence-based simulations that improve real-world medical skills.",
    imageUrl: "/med_sim.jpg",
  },
  {
    title: "Optimized Learning",
    description:
      "Use AI-driven personalization to adapt training to individual needs and skill levels.",
    imageUrl: "/optimized_learn.jpg",
  },
  {
    title: "Global Accessibility",
    description:
      "Provide scalable and accessible medical training to professionals worldwide.",
    imageUrl: "/med_edu.jpg",
  },
  {
    title: "Next-Gen Innovation",
    description:
      "Continuously push the boundaries of AR/VR technology to revolutionize medical education.",
    imageUrl: "/vr_edu.jpg",
  },
  {
    title: "Immersive Collaboration",
    description:
      "Enable teamwork and realistic scenarios to train professionals in effective decision-making.",
    imageUrl: "/collab.jpg",
  },
];

const OurValues: React.FC = () => {
  return (
    <div className="flex flex-col gap-16 px-6 md:px-12 py-12 bg-sky-500">
      <div className="text-center p-6">
        <h2 className="text-6xl font-bold mb-4 text-white">Our Values</h2>
      </div>
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={index}
            className={`flex flex-col-reverse md:flex-row items-center gap-8 bg-white p-6 rounded-lg ${
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Text Block */}
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl md:text-5xl font-bold mb-4 text-sky-500">
                {section.title}
              </h2>
              <p className="text-base md:text-lg ">{section.description}</p>
            </div>

            {/* Image Block */}
            <div className="md:w-1/2">
              <img
                src={section.imageUrl}
                alt={section.title}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OurValues;
