import { useMutation } from "@tanstack/react-query";
import { login } from "../services/AuthServices";

export const useLoginMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: login,
    onSuccess,
    onError,
  });
};
