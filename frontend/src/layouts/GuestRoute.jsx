import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const GuestRoute = ({ children }) => {
  const { isAuth, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (isAuth) return <Navigate to="/" replace />;

  return children;
};

export default GuestRoute;
