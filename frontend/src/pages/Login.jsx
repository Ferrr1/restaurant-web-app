import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { MdMailOutline, MdOutlineLock } from "react-icons/md";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Simulasi login berhasil
    console.log("Data Login:", data);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="md:w-1/2 w-full h-64 md:h-auto">
        <img
          src=""
          alt="This Image Login"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right Section */}
      <div className="md:w-1/2 w-full bg-surface flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-4 flex flex-col gap-4">
            <div className="text-center">
              <h1 className="font-bold text-3xl text-text">Welcome Back</h1>
              <p className="text-sm text-text-muted">
                Please sign in to continue
              </p>
            </div>

            <Input
              label="Username"
              className="w-full text-text"
              placeholder="Enter your username"
              IconStart={MdMailOutline}
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm -mt-3">
                {errors.username.message}
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
              <Button variant="confirm" className="mt-2" type="submit">
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
