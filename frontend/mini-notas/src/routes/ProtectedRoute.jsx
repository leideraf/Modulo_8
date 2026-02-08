import { Navigate } from "react-router-dom";

/**
 * Protege rutas privadas verificando JWT
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
