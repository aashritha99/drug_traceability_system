// client/src/pages/User/Dashboard.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function UserDashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Track Drug Card */}
          <Link
            to="/user/track"
            className="rounded-xl p-6 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">Track Drug</h2>
            <p className="text-blue-100">Scan or enter drug details to track its lifecycle.</p>
          </Link>

          {/* My History Card */}
          <div className="rounded-xl p-6 bg-green-600 hover:bg-green-700 text-white transition-all duration-300 shadow-md">
            <h2 className="text-xl font-semibold mb-2">My History</h2>
            <p className="text-green-100">View drugs you've tracked recently.</p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome, {currentUser?.displayName || 'User'}
          </h2>
          <p className="text-gray-600">
            Use this platform to track the lifecycle of pharmaceutical drugs from manufacture to
            consumption. Stay informed and ensure drug authenticity.
          </p>
        </div>
      </div>
    </div>
  );
}
