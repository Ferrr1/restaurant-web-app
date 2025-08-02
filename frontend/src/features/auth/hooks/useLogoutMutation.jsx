import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/AuthServices";

export const useRegisterMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: logout,
    onSuccess,
    onError,
  });
};
