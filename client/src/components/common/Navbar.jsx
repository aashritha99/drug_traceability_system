import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("name");

  // Get user role safely
  let isAdmin = false;
  if (token) {
    try {
      const decoded = jwtDecode(token.replace("Bearer ", ""));
      isAdmin = decoded.role !== "user";
    } catch (error) {
      console.error("Token decode error:", error);
      handleSignOut();
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("isAdmin");
    navigate("/login", { replace: true });
  };

  // Don't render navbar until auth check is complete
  if (token === null) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            DrugTrace
          </Link>

          {currentUser ? (
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-4">
                <Link
                  to={isAdmin ? "/admin" : "/user"}
                  className="px-3 py-2 text-gray-700 hover:text-primary transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/about"
                  className="px-3 py-2 text-gray-700 hover:text-primary transition"
                >
                  About
                </Link>
                <Link
                  to="/user/track"
                  className="px-3 py-2 text-gray-700 hover:text-primary transition"
                >
                  Track Drug
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/drugs"
                    className="px-3 py-2 text-gray-700 hover:text-primary transition"
                  >
                    Manage Drugs
                  </Link>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  {currentUser.displayName?.charAt(0) || "U"}
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-white-700 hover:text-primary transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/signin"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
