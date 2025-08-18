import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { MdMailOutline, MdOutlineLock } from "react-icons/md";
import imageLogin from "../assets/images/food/filter/bg_login.webp";
import { login } from "../features/auth/services/AuthServices";
import { useAuth } from "../context/AuthContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { useNotify } from "../context/NotifyContext";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const { push } = useNotify();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: login,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: async (res) => {
      try {
        setAuth(res.data.user, res.data.accessToken);
        navigate("/home");
      } catch (error) {
        console.error("Gagal ambil data user:", error);
      } finally {
        push({ message: "Berhasil login!", type: "success" });
        setLoading(false);
      }
    },
    onError: (err) => {
      push({
        message: err?.response?.data?.message || "Login gagal",
        type: "error",
      });
      console.error("Login gagal:", err?.response?.data);
      setLoading(false);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden md:block md:w-1/2 h-screen">
        <img
          src={imageLogin}
          alt="This Image Login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full bg-surface flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-4 flex flex-col gap-4"
          >
            <div className="text-center">
              <h1 className="font-bold text-3xl text-text">Welcome Back</h1>
              <p className="text-sm text-text-muted">
                Please sign in to continue
              </p>
            </div>

            <Input
              label="Email"
              className="w-full text-text"
              placeholder="Enter your email"
              IconStart={MdMailOutline}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm -mt-3">
                {errors.email.message}
              </p>
            )}

            <Input
              type="password"
              label="Password"
              className="w-full text-text"
              placeholder="Enter your password"
              IconStart={MdOutlineLock}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm -mt-3">
                {errors.password.message}
              </p>
            )}

            <p className="flex justify-end text-text-muted text-sm hover:underline hover:text-text cursor-pointer -mt-3">
              Forgot Password?
            </p>

            <div className="flex justify-center mt-2">
              <Button
                disabled={loading}
                variant="confirm"
                className="mt-2"
                type="submit"
              >
                {loading && (
                  <AiOutlineLoading3Quarters
                    size={20}
                    className="animate-spin"
                  />
                )}
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
