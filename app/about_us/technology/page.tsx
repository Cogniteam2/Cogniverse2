"use client";

export default function HowWeWork() {
    return (
        <>
            <div className="bg-gray-50 text-gray-800">
                <section className="relative bg-purple-800 text-white pt-[80px]">
                    <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold">The Future of Medical Training is Here</h1>
                        <p className="mt-4 text-lg md:text-xl">
                            Medical training has long relied on textbooks, lectures, and limited hands-on practice, but CogniVerse is changing that.
                        </p>
                    </div>
                </section>

                {/* Technology Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                        {/* Left: Image */}
                        <div>
                            <img
                                src="/path-to-your-image.jpg" // Replace with the actual image path
                                alt="Medical VR Training"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        {/* Right: Text */}
                        <div>
                            <h2 className="text-3xl font-bold text-purple-800">Our Technology – What We Do</h2>
                            <p className="mt-4 text-lg">
                                CogniVerse's VR-powered simulations provide risk-free, immersive, and highly interactive learning environments where medical professionals can train, practice, and perfect their skills.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Unique Features Section */}
                <section className="py-16 bg-purple-100">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-purple-800">What Makes CogniVerse’s VR Technology Unique?</h2>
                        <div className="mt-8 grid md:grid-cols-3 gap-8">
                            {/* Feature Cards */}
                            {[
                                "Hyper-Realistic Simulations",
                                "Real-Time Feedback & Analytics",
                                "Risk-Free Training",
                                "Adaptive Learning",
                                "Collaborative VR Training",
                                "Scalable & Cost-Effective",
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                                >
                                    <p className="text-lg font-semibold text-gray-700">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How We Work Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                        {/* Left: Text */}
                        <div>
                            <h2 className="text-3xl font-bold text-purple-800">How We Work</h2>
                            <ul className="mt-4 space-y-4 text-lg list-disc list-inside text-gray-700">
                                <li>We create hyper-realistic simulations for immersive learning.</li>
                                <li>Our platform provides real-time feedback to improve skills.</li>
                                <li>Risk-free training ensures safety for all participants.</li>
                                <li>Adaptive learning tailors experiences to individual needs.</li>
                                <li>Collaborative VR training fosters teamwork and communication.</li>
                            </ul>
                        </div>

                        {/* Right: Image */}
                        <div>
                            <img
                                src="/path-to-your-second-image.jpg" // Replace with the actual image path
                                alt="Team Collaboration"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-16 bg-purple-100 text-purple-800">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold">Ready to Experience the Future of Medical Training?</h2>
                        <p className="mt-4 text-lg">
                            Join CogniVerse today and take your training to the next level.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block mt-6 px-8 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-semibold transition-colors"
                        >
                            Get Started
                        </a>
                    </div>
                </section>
            </div>
        </>
    );
}
