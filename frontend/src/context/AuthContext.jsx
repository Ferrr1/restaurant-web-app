import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserData } from "../features/auth/services/AuthServices";

// Fungsi sederhana untuk mendapatkan data user

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Ambil user dari localStorage jika ada (untuk persistensi saat refresh)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
  );
  const [loading, setLoading] = useState(true);

  const { mutate } = useMutation({
    mutationFn: getUserData,
    onSuccess: (response) => {
      const userData = response.data?.user || response.data; // sesuaikan dengan struktur response Anda
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setLoading(false);
    },
    onError: (err) => {
      console.error("Error fetching user data:", err);
      setUser(null);
      localStorage.removeItem("user");
      setLoading(false);
    },
  });

  useEffect(() => {
    if (accessToken) {
      mutate();
    } else {
      setLoading(false);
    }
  }, [accessToken, mutate]);

  // Fungsi untuk update user dan access token secara bersamaan
  const updateAuth = (userData, token) => {
    setUser(userData);
    setAccessToken(token);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  const logout = () => {
    updateAuth(null, null);
  };

  const value = {
    user,
    accessToken,
    loading,
    setAuth: updateAuth,
    logout,
    refetchUser: mutate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
