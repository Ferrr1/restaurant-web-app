import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import Button from "../components/ui/Button";
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulasi login
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  return (
    <div>
      <div className=" flex justify-center items-center bg-surface">
        <div className="p-5 flex flex-col items-center w-72">
          <form action="" method="get" className="w-full">
            <Input label="Username" className="w-full" placeholder="Username" />
            <Input label="Password" className="w-full" placeholder="Password" />
            <div className="flex justify-center gap-2 mt-2">
              <Button variant="confirm" className="mt-2" onClick={handleLogin}>
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
