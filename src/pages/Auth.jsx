import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

import { login, register } from "../services/authService";

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";

import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import XSvg from "../assets/X";

const LoginPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    setFormData({ username: "", password: "", confirmPassword: "" });
  }, [isLogin]);
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsLogin(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      // TODO: update UI (show missing fields, error on top)
      toast.error("Please fill all the fields");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (isLogin) {
      loginMutation.mutate(formData);
    } else {
      registerMutation.mutate(formData);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    // TODO: fix UI
    <div className="mx-auto flex h-screen max-w-screen-xl flex-col items-center md:flex-row">
      <div className="flex w-24 flex-1 items-center justify-center md:max-w-[50%] lg:h-full">
        <XSvg className="w-2/3 fill-black" />
      </div>
      <div className="flex flex-grow items-center p-4 md:h-screen md:max-w-[50%] xl:max-h-[1000px]">
        <div className="authContent flex flex-1 flex-col items-start justify-between gap-8 p-4 lg:min-h-[80%]">
          <h1 className="my-4 hidden text-6xl font-black lg:block">
            Happening now
          </h1>
          <form
            className="flex w-full flex-1 flex-col items-start gap-4"
            onSubmit={handleSubmit}
          >
            <h3 className="text-4xl font-extrabold text-black">
              {isLogin ? "Let's go" : "Join now"}
            </h3>
            {loginMutation.isError && (
              <p className="text-red-500">{loginMutation.error.message}</p>
            )}
            {registerMutation.isError && (
              <p className="text-red-500">{registerMutation.error.message}</p>
            )}
            <label className="input input-bordered flex items-center gap-2 rounded">
              <FaUser className="text-black" />
              <Input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 rounded">
              <MdPassword className="text-black" />
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                isPassword
              />
            </label>

            {!isLogin && (
              <label className="input input-bordered flex items-center gap-2 rounded">
                <MdPassword className="text-black" />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={handleInputChange}
                  value={formData.confirmPassword}
                  isPassword
                />
              </label>
            )}
            <Button
              label={
                loginMutation.isPending || registerMutation.isPending
                  ? "Loading..."
                  : isLogin
                    ? "Login"
                    : "Sign Up"
              }
              secondary
              classNames={twMerge(
                "btn btn-primary btn-outline rounded-full w-1/2",
                (loginMutation.isPending || registerMutation.isPending) &&
                  "cursor-not-allowed opacity-50",
              )}
              disabled={loginMutation.isPending || registerMutation.isPending}
            />
          </form>
          <div className="mt-4 text-center">
            <span>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-500"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
