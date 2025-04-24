import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children, isAdmin = false }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token.replace("Bearer ", ""));
    const userIsAdmin = decoded.role !== "user";

    if (isAdmin && !userIsAdmin) {
      return <Navigate to="/user" replace />;
    }

    if (!isAdmin && userIsAdmin) {
      return <Navigate to="/admin" replace />;
    }

    return children;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("name");
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
