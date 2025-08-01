import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // atau bisa pakai token
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
