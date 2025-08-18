import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/ui/LoadingScreen";

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect ke halaman sebelumnya atau home
        const redirectPath = location.state?.from?.pathname || "/home";
        navigate(redirectPath, { replace: true });
      }
    }
  }, [user, loading, navigate, location]);

  if (loading) return <LoadingScreen />;

  if (!user) return children;

  return null;
};

export default GuestRoute;
