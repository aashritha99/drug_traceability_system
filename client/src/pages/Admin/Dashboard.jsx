import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Navbar } from "../../components/common/Navbar";
import { 
  FaPills, 
  FaSearch, 
  FaChartLine, 
  FaUsers, 
  FaInfoCircle,
  FaQrcode
} from "react-icons/fa";

export function AdminDashboard() {
  const currentUser = localStorage.getItem("name");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token.replace("Bearer ", ""));
      if (decoded.role === "user") {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("name");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Manage the pharmaceutical traceability system
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-white p-3 rounded-lg shadow-sm">
            <p className="text-gray-700">
              Welcome, <span className="font-semibold text-blue-600">{currentUser}</span>
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Manage Drugs Card */}
          <Link
            to="/admin/drugs"
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <FaPills className="text-purple-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Manage Drugs</h2>
              </div>
              <p className="text-gray-600">
                Add, edit, and track drug information
              </p>
            </div>
            <div className="bg-purple-50 px-6 py-3 border-t border-gray-100">
              <p className="text-sm text-purple-600 font-medium">Access drug database</p>
            </div>
          </Link>

          {/* Track Drug Card */}
          <Link
            to="/admin/track"
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FaQrcode className="text-blue-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Track Drug</h2>
              </div>
              <p className="text-gray-600">
                Scan or enter drug details to track its lifecycle
              </p>
            </div>
            <div className="bg-blue-50 px-6 py-3 border-t border-gray-100">
              <p className="text-sm text-blue-600 font-medium">Trace medications</p>
            </div>
          </Link>

          {/* Analytics Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                  <FaChartLine className="text-red-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Analytics</h2>
              </div>
              <p className="text-gray-600">
                View system usage statistics and reports
              </p>
            </div>
            <div className="bg-red-50 px-6 py-3 border-t border-gray-100">
              <p className="text-sm text-red-600 font-medium">View insights</p>
            </div>
          </div>

          {/* User Management Card */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <FaUsers className="text-green-600 text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
              </div>
              <p className="text-gray-600">
                View and manage system users and permissions
              </p>
            </div>
            <div className="bg-green-50 px-6 py-3 border-t border-gray-100">
              <p className="text-sm text-green-600 font-medium">Manage access</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <Link
          to="/user/about"
          className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden mb-8"
        >
          <div className="p-6">
            <div className="flex items-center">
              <div className="bg-teal-100 p-3 rounded-lg mr-4">
                <FaInfoCircle className="text-teal-600 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">About the System</h2>
                <p className="text-gray-600 mt-1">
                  Learn more about the pharmaceutical traceability platform
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* Welcome Panel */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Administrator Overview</h2>
          <p className="text-gray-600">
            As an administrator, you have full access to manage all drugs in the
            system, generate QR codes for traceability, and oversee user accounts.
          </p>
          <div className="mt-4 flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <FaQrcode className="text-blue-600" />
            </div>
            <p className="text-sm text-gray-500">
              Scan the QR code on any drug packaging to view its complete history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}