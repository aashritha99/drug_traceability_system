import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SignIn } from "./pages/Auth/SignIn";
import { AdminDashboard } from "./pages/Admin/Dashboard";
import { UserDashboard } from "./pages/User/Dashboard";
import { DrugManagement } from "./pages/Admin/DrugManagement";
import { TrackDrug } from "./pages/User/TrackDrug";
import Landing from "./pages/Landing";
import { Signup } from "./pages/Auth/Signup";
import { About } from "./pages/User/About";
import Contact from "./pages/Contact";
import "./index.css";
import PrivateRoute from "./components/common/PrivateRoute";
import { ScanDrug } from "./pages/User/ScanDrug";
import { DrugDetails } from "./pages/User/DrugDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/scan" element={<ScanDrug />} />
        <Route path="/user/drug/:drugId" element={<DrugDetails />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute isAdmin={true}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/drugs"
          element={
            <PrivateRoute isAdmin={true}>
              <DrugManagement />
            </PrivateRoute>
          }
        />

        {/* Protected User Routes */}
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/track"
          element={
            <PrivateRoute>
              <TrackDrug />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
