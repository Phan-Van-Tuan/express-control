import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { ILoginRequest } from "../types/auth.type";

const initForm: ILoginRequest = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { loginMutation } = useAuth();
  const [isShowPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<ILoginRequest>(initForm);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loginMutation.mutate(form, {
        onSuccess: () => {
          navigate("/");
        },
      });
    } catch (e) {
      console.log(e);
      toast.error("Login failed!");
    }
  };

  return (
    <div className="w-full border shadow-lg bg-white dark:bg-gray-800 lg:translate-x-1/2 lg:translate-y-20 lg:w-1/2 lg:border-l-2">
      <div className="w-full p-10 sm:p-12.5 lg:p-17.5">
        <span className="mb-1.5 block font-medium">Welcome</span>
        <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
          Sign In to Express Control
        </h2>
        <div>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Email
            </label>
            <div className="relative">
              <input
                name="email"
                type="text"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="absolute right-4 top-4">
                <Mail style={{ fontSize: "22px", color: "#caccd0" }} />
              </span>
            </div>
          </div>
          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={isShowPassword ? "text" : "password"}
                placeholder="6+ Characters, 1 Capital letter"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="absolute right-4 top-4">
                <button onClick={() => setShowPassword(!isShowPassword)}>
                  {isShowPassword ? (
                    <Eye style={{ fontSize: "22px", color: "#caccd0" }} />
                  ) : (
                    <EyeOff style={{ fontSize: "22px", color: "#caccd0" }} />
                  )}
                </button>
              </span>
            </div>
          </div>
          <input
            type="submit"
            onClick={handleSubmit}
            className="mb-6 w-full cursor-pointer rounded-lg border bg-blue-500 p-4 text-white transition hover:bg-opacity-90"
            value={`${false ? "Loading..." : "Sign In"}`}
          />
          <div className="mt-6 text-center">
            <p>
              If you forgot your password or need an additional admin account,
              please{" "}
              <a
                className="text-blue-500"
                href="https://www.facebook.com/tuanfitfo"
                target="blank"
              >
                contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
