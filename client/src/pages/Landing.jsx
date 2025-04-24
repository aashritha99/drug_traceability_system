import { Link } from "react-router-dom";

// Updated Feature Card (smaller and centered)
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center max-w-xs mx-auto">
    <div className="text-blue-600 text-2xl mb-3">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// Testimonial component remains the same
const Testimonial = ({ quote, author, role }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <p className="text-gray-700 italic mb-4">"{quote}"</p>
    <div className="text-right">
      <p className="font-medium">{author}</p>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
);

// StatCounter component remains the same
const StatCounter = ({ number, label }) => (
  <div className="text-center">
    <span className="text-4xl font-bold text-blue-600">{number}+</span>
    <p className="text-gray-600 mt-2">{label}</p>
  </div>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Navigation - unchanged */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">PharmaTrack</h1>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - unchanged */}
      <main className="flex-grow">
        <section className="flex items-center py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Track Drugs with Confidence
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Secure QR-based tracking system for the entire drug lifecycle from
              manufacturer to consumer
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/login"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Updated Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 ">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 ">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 ">
              <FeatureCard
                icon="🔍"
                title="End-to-End Tracking"
                description="Monitor every step from production to patient"
              />
              <FeatureCard
                icon="📱"
                title="Mobile Friendly"
                description="Scan QR codes from any device"
              />
              <FeatureCard
                icon="🛡️"
                title="Secure Data"
                description="Military-grade encryption protection"
              />
            </div>
          </div>
        </section>

        {/* Stats Section with outline */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm bg-gradient-to-br from-blue-50 to-indigo-100">
              {" "}
              {/* Added container with border */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <StatCounter number="10,000" label="Drugs Tracked" />
                <StatCounter number="500" label="Healthcare Partners" />
                <StatCounter number="24" label="Countries" />
                <StatCounter number="99.9" label="Uptime %" />
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials Section - unchanged */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Testimonial
                quote="PharmaTrack revolutionized our supply chain visibility. We've reduced counterfeit drugs by 95%."
                author="Dr. Sarah Johnson"
                role="Hospital Pharmacy Director"
              />
              <Testimonial
                quote="The intuitive interface makes it easy for our field agents to verify medications instantly."
                author="Michael Chen"
                role="Regulatory Compliance Officer"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer - unchanged */}
      <footer className="bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          © {new Date().getFullYear()} PharmaTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
