// client/src/pages/About.jsx
import { 
    FaQrcode, 
    FaShieldAlt, 
    FaSearch, 
    FaIndustry,
    FaTruck,
    FaClinicMedical
  } from 'react-icons/fa';
  
  export function About() {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              About Our Drug Traceability System
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600">
              Ensuring pharmaceutical safety through QR-code based tracking
            </p>
          </div>
  
          {/* How It Works Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How Our System Works
            </h2>
            <div className="space-y-12">
              {[
                {
                  icon: <FaIndustry className="text-blue-600 text-3xl" />,
                  title: "Manufacturer Registration",
                  description: "Each drug batch is assigned a unique QR code during production"
                },
                {
                  icon: <FaTruck className="text-green-600 text-3xl" />,
                  title: "Distribution Tracking",
                  description: "Scan QR codes at each distribution point to update location"
                },
                {
                  icon: <FaClinicMedical className="text-purple-600 text-3xl" />,
                  title: "Pharmacy Verification",
                  description: "Pharmacies verify authenticity before dispensing to patients"
                },
                {
                  icon: <FaSearch className="text-red-600 text-3xl" />,
                  title: "Consumer Verification",
                  description: "Patients can scan QR codes to verify drug authenticity"
                }
              ].map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center">
                  <div className="flex-shrink-0 bg-white p-4 rounded-full shadow-md mb-4 md:mb-0 md:mr-6">
                    {step.icon}
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-gray-600 max-w-md">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Benefits Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
              System Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaShieldAlt className="text-green-500 text-4xl mb-4" />,
                  title: "Enhanced Safety",
                  description: "Prevents counterfeit drugs from entering the supply chain"
                },
                {
                  icon: <FaQrcode className="text-blue-500 text-4xl mb-4" />,
                  title: "Easy Verification",
                  description: "Simple QR code scanning for instant drug verification"
                },
                {
                  icon: <FaSearch className="text-purple-500 text-4xl mb-4" />,
                  title: "Full Transparency",
                  description: "Track a drug's complete journey from factory to pharmacy"
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
                  {benefit.icon}
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
  
          {/* About Company */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About Our Company
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We are a pharmaceutical technology company dedicated to improving drug safety through innovative tracking solutions. Our QR-based system has been adopted by leading manufacturers and pharmacies nationwide.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-blue-600">100+</p>
                <p className="text-gray-600">Pharmaceutical Partners</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-blue-600">10M+</p>
                <p className="text-gray-600">Drugs Tracked</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-blue-600">99.9%</p>
                <p className="text-gray-600">Accuracy Rate</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-2xl font-bold text-blue-600">24/7</p>
                <p className="text-gray-600">System Monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }