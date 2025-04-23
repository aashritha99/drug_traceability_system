import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaExternalLinkAlt } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header with subtle decoration */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">Get In Touch</h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
      </div>
      
      <div className="space-y-8">
        {/* Contact cards with hover effects */}
        <div className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaPhone className="text-blue-600 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Phone Support</h2>
            <p className="text-gray-600">+1 (123) 456-7890</p>
            <p className="text-sm text-gray-500 mt-1">Available during business hours</p>
          </div>
        </div>

        <div className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaEnvelope className="text-blue-600 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Email Us</h2>
            <a 
              href="mailto:support@drugtrace.com" 
              className="text-blue-600 hover:underline flex items-center"
            >
              support@drugtrace.com
              <FaExternalLinkAlt className="ml-1 text-xs" />
            </a>
            <p className="text-sm text-gray-500 mt-1">Typically respond within 24 hours</p>
          </div>
        </div>

        <div className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaMapMarkerAlt className="text-blue-600 text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Our Location</h2>
            <p className="text-gray-600">
              123 Pharma Street<br />
              Boston, MA 02134<br />
              United States
            </p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline flex items-center mt-1"
            >
              View on map <FaExternalLinkAlt className="ml-1 text-xs" />
            </a>
          </div>
        </div>

        {/* Business hours with visual separation */}
        <div className="pt-6 mt-6 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <FaClock className="text-blue-600 mr-3 text-xl" />
            <h2 className="text-xl font-semibold text-gray-800">Business Hours</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-700">Monday - Friday</p>
              <p className="text-gray-600">9:00 AM - 5:00 PM</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Weekends</p>
              <p className="text-gray-600">Closed</p>
            </div>
          </div>
        </div>

        {/* Emergency notice */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <h3 className="font-semibold text-red-800">For Emergencies</h3>
          <p className="text-red-700 text-sm">
            If this is a medical emergency, please call 911 or your local emergency number immediately.
          </p>
        </div>
      </div>
    </div>
  );
}