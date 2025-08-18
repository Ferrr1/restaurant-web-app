import { useMutation } from "react-query";
import { register } from "../services/AuthServices";

export const useRegisterMutation = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: register,
    onSuccess,
    onError,
  });
};
