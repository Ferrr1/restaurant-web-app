import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../features/auth/services/AuthServices";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const {
    data,
    isLoading: loading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["auth:user"],
    queryFn: getUserData,
    retry: false, // jangan retry kalau gagal (misal 401)
  });

  const user = data?.data?.user || null;
  const isAuth = !!user && !isError;

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuth, refetchUser: refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
