import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/common/Navbar";
import { FaSearch, FaHistory, FaQrcode } from "react-icons/fa";

export function UserDashboard() {
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
      if (decoded.role !== "user") {
        navigate("/admin");
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
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome, {currentUser || "User"}
            </h1>
            <p className="text-gray-600 mb-6">
              Track pharmaceutical drugs and verify their authenticity using our
              platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Scan QR Card */}
              <Link
                to="/user/scan"
                className="bg-white border border-blue-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaQrcode className="text-blue-600 text-xl" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Scan QR Code
                  </h2>
                </div>
                <p className="text-gray-600">
                  Scan a drug's QR code to view its complete details and
                  tracking history.
                </p>
              </Link>

              {/* Track Drug Card */}
              <Link
                to="/user/track"
                className="bg-white border border-green-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaSearch className="text-green-600 text-xl" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Track Drug
                  </h2>
                </div>
                <p className="text-gray-600">
                  Search for a drug using its batch number to verify its
                  authenticity.
                </p>
              </Link>

              {/* History Card */}
              <Link
                to="/user/history"
                className="bg-white border border-purple-100 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FaHistory className="text-purple-600 text-xl" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    My History
                  </h2>
                </div>
                <p className="text-gray-600">
                  View all drugs you've recently tracked and their current
                  status.
                </p>
              </Link>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-500">
                Your recent drug scans will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
