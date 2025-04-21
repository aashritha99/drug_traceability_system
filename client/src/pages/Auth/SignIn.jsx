// client/src/pages/Auth/SignIn.jsx
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Drug Traceability System
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in with your Google account
          </p>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleSignIn}
            className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FcGoogle className="h-5 w-5" />
            </span>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}