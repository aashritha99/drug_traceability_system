// client/src/pages/Admin/Dashboard.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function AdminDashboard() {
  const { currentUser } = useAuth();

  return (
    <div>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/drugs"
            className="bg-primary hover:bg-primary-dark text-white rounded-lg p-6 shadow transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">Manage Drugs</h2>
            <p className="text-primary-light">Add, edit, and track drug information</p>
          </Link>
          
          <div className="bg-secondary hover:bg-secondary-dark text-white rounded-lg p-6 shadow transition duration-300">
            <h2 className="text-xl font-semibold mb-2">Analytics</h2>
            <p className="text-secondary-light">View system usage statistics</p>
          </div>
          
          <div className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-6 shadow transition duration-300">
            <h2 className="text-xl font-semibold mb-2">User Management</h2>
            <p className="text-green-200">View and manage system users</p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Welcome, {currentUser?.displayName}</h2>
          <p className="text-gray-600">
            As an administrator, you have full access to manage all drugs in the system and generate
            QR codes for traceability.
          </p>
        </div>
      </div>
    </div>
  );
}