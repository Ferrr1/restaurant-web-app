import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
import { MdMailOutline, MdOutlineLock } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Data register:", data);
    // Kirim ke backend di sini jika perlu
    navigate("/login");
  };

  const password = watch("password");

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-8 flex flex-col items-center w-[30%] h-auto bg-surface rounded-3xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div className="text-center">
            <h1 className="font-bold text-2xl text-text">Create an Account</h1>
            <p className="text-sm text-text-muted">
              Sign up now to get started with your journey
            </p>
          </div>

          {/* Username */}
          <div>
            <Input
              label="Username"
              className="w-full text-text"
              placeholder="Username"
              IconStart={FaRegUser}
              {...register("username", { required: "Username wajib diisi" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              type="email"
              label="Email"
              className="w-full text-text"
              placeholder="Email"
              IconStart={MdMailOutline}
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Format email tidak valid",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              type="password"
              label="Password"
              className="w-full text-text"
              placeholder="Password"
              IconStart={MdOutlineLock}
              {...register("password", {
                required: "Password wajib diisi",
                minLength: {
                  value: 6,
                  message: "Password minimal 6 karakter",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Input
              type="password"
              label="Confirm Password"
              className="w-full text-text"
              placeholder="Confirm Password"
              IconStart={MdOutlineLock}
              {...register("confirmPassword", {
                required: "Konfirmasi password wajib diisi",
                validate: (value) =>
                  value === password || "Konfirmasi password tidak cocok",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Tombol Register */}
          <div className="flex justify-center mt-2">
            <Button variant="confirm" className="mt-2" type="submit">
              Register
            </Button>
          </div>

          {/* Sudah punya akun */}
          <div className="text-text-muted text-sm text-center">
            <p>
              Already have an account?
              <Link
                className="hover:underline hover:text-text cursor-pointer ml-1"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
