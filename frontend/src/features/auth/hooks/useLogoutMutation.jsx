import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/AuthServices";

export const useLogoutMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: logout,
    onSuccess,
    onError,
  });
};
