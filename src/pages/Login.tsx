import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { authService } from "../services";
import { setLoading } from "../lib/slices/loadingSlice";
import useAuth from "../hooks/useAuth";

interface LoginFormState {
  phone: string;
  password: string;
}

const initForm: LoginFormState = {
  phone: "",
  password: "",
};

const Login = () => {
  const { signIn } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<LoginFormState>(initForm);

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
      dispatch(setLoading(true));
      const rs = await authService.login({
        phone: form.phone,
        password: form.password,
        // role: "owner",
        role: "admin",
      });
      console.log(rs.data);
      signIn(rs.data);
      toast.success(rs.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (e) {
    } finally {
      dispatch(setLoading(false));
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
              Phone Number
            </label>
            <div className="relative">
              <input
                name="phone"
                type="text"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <span className="absolute right-4 top-4">
                <PhoneOutlined style={{ fontSize: "22px", color: "#caccd0" }} />
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
                    <EyeOutlined
                      style={{ fontSize: "22px", color: "#caccd0" }}
                    />
                  ) : (
                    <EyeInvisibleOutlined
                      style={{ fontSize: "22px", color: "#caccd0" }}
                    />
                  )}
                </button>
              </span>
            </div>
          </div>
          <div className="mb-6">
            <input
              type="submit"
              onClick={handleSubmit}
              className="w-full cursor-pointer rounded-lg border bg-blue-500 p-4 text-white transition hover:bg-opacity-90"
              value={`${false ? "Loading..." : "Sign In"}`}
            />
          </div>
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
