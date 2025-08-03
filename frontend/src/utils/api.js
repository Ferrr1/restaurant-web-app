import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Store CSRF token in memory rather than using hook
// let csrfToken = null;

// export const setCsrfToken = (token) => {
//   csrfToken = token;
// };

// // Request interceptor
// api.interceptors.request.use((config) => {
//   // Skip for GET requests and CSRF route
//   if (config.method === "get" || config.url === "/auth/csrf-token") {
//     return config;
//   }

//   // Add CSRF token if available
//   if (csrfToken) {
//     config.headers["X-CSRF-Token"] = csrfToken;
//   }

//   return config;
// });

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
// !originalRequest._retry &&
//       originalRequest.url !== "/auth/refresh-token"
//     ) {
//       originalRequest._retry = true;

//       try {
//         const { data } = await api.post("/auth/refresh-token");

//         // Update access token in cookies
//         document.cookie = `accessToken=${data.accessToken}; path=/; secure; samesite=strict`;

//         // Retry original request
//         originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         if (refreshError.response?.status === 401) {
//           await api.post("/auth/logout");
//           window.location.href = "/login?error=session_expired";
//         }
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
