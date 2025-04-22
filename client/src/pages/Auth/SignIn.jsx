import { useState } from 'react';
import { signInWithGoogle } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

export function SignIn() {
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(currentUser?.email === 'admin@example.com' ? '/admin' : '/user');
    } catch (err) {
      setError('Failed to sign in with Google');
      console.error(err);
    }
  };

  if (currentUser) {
    navigate(currentUser.email === 'admin@example.com' ? '/admin' : '/user');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          {/* Logo/Title Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Drug Traceability System
            </h1>
            <p className="text-gray-600">
              Sign in with your Google account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
              <p>{error}</p>
            </div>
          )}

          {/* Sign In Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleGoogleSignIn}
              className="w-full max-w-xs flex items-center justify-center gap-3 py-3 px-6 
                       border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FcGoogle className="text-xl" />
              <span className="text-sm font-medium">
                Sign in with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}