// client/src/components/common/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signOut } from '../../services/firebase';

export function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const isAdmin = currentUser?.email === 'admin@example.com';

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

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
                {isAdmin ? (
                  <Link 
                    to="/admin/drugs" 
                    className="px-3 py-2 text-gray-700 hover:text-primary transition"
                  >
                    Manage Drugs
                  </Link>
                ) : (
                  <Link 
                    to="/user/track" 
                    className="px-3 py-2 text-gray-700 hover:text-primary transition"
                  >
                    Track Drug
                  </Link>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  {currentUser.displayName?.charAt(0) || 'U'}
                </div>
                <button 
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-primary transition"
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