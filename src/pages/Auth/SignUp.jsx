import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";

import XSvg from "../../assets/X";
import { register } from "../../services/authService";
import { twMerge } from "tailwind-merge";

const SignUpPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/login");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if user has filled all fields
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    registerMutation.mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    // TODO: fix UI
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className="lg:w-2/3 fill-black" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          className="lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
        >
          <XSvg className="w-24 lg:hidden fill-black" />
          <h1 className="text-4xl font-extrabold text-black">Join today.</h1>

          <div className="flex gap-4 flex-wrap">
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <FaUser />
              <input
                type="text"
                className="grow "
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
              />
            </label>
          </div>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleInputChange}
              value={formData.confirmPassword}
            />
          </label>
          <button
            className={twMerge(
              "btn rounded-full btn-primary text-black",
              registerMutation.isPending && "cursor-not-allowed opacity-50"
            )}
          >
            {registerMutation.isPending ? "Loading..." : "Sign up"}
          </button>
          {registerMutation.isError && (
            <p className="text-red-500">{registerMutation.error.message}</p>
          )}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-black text-lg">Already have an account?</p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary text-black btn-outline w-full">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
