// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { SignIn } from './pages/Auth/SignIn';
import { AdminDashboard } from './pages/Admin/Dashboard';
import { UserDashboard } from './pages/User/Dashboard';
import { DrugManagement } from './pages/Admin/DrugManagement';
import { TrackDrug } from './pages/User/TrackDrug';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import Landing from './pages/Landing';
import { Signup } from './pages/Auth/Signup';
import { About } from './pages/User/About'; // Import About component
import './index.css';

function App() {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.email === 'admin@pharmatrack.com';

  return (
    <Router>
      <div className="min-h-screen">
        {/* Only show Navbar for authenticated routes */}
        {currentUser && <Navbar />}
        <main className="w-full min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                currentUser 
                  ? <Navigate to={isAdmin ? "/admin" : "/user"} /> 
                  : <Landing />
              } 
            />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} /> {/* Keeping both for backward compatibility */}
            <Route path="/signup" element={<Signup />} />

            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                currentUser && isAdmin 
                  ? <AdminDashboard /> 
                  : <Navigate to="/" />
              } 
            />
            <Route 
              path="/admin/drugs" 
              element={
                currentUser && isAdmin 
                  ? <DrugManagement /> 
                  : <Navigate to="/" />
              } 
            />

            {/* User Routes */}
            <Route 
              path="/user" 
              element={
                currentUser && !isAdmin 
                  ? <UserDashboard /> 
                  : <Navigate to="/" />
              } 
            />
            <Route 
              path="/user/track" 
              element={
                currentUser && !isAdmin 
                  ? <TrackDrug /> 
                  : <Navigate to="/" />
              } 
            />

            {/* About Route */}
            <Route path="/About" element={<About />} />

            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        {/* Only show Footer for authenticated routes */}
        {currentUser && <Footer />}
      </div>
    </Router>
  );
}

export default App;