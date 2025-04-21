// client/src/pages/User/Dashboard.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function UserDashboard() {
  const { currentUser } = useAuth();

  return (
    <div>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">User Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/user/track"
            className="bg-primary hover:bg-primary-dark text-white rounded-lg p-6 shadow transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">Track Drug</h2>
            <p className="text-primary-light">Scan or enter drug details to track its lifecycle</p>
          </Link>
          
          <div className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-6 shadow transition duration-300">
            <h2 className="text-xl font-semibold mb-2">My History</h2>
            <p className="text-green-200">View drugs you've tracked recently</p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Welcome, {currentUser?.displayName}</h2>
          <p className="text-gray-600">
            Use this system to track the lifecycle of pharmaceutical drugs from manufacture to consumption.
          </p>
        </div>
      </div>
    </div>
  );
}