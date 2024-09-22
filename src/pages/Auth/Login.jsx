import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";

import XSvg from "../../assets/X";
import { login } from "../../services/authService";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

const LoginPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      // TODO: update UI (show missing fields, error on top)
      toast.error("Please fill all the fields");
      return;
    }

    loginMutation.mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    // TODO: fix UI
    <div className="max-w-screen-xl mx-auto flex h-screen  ">
      <div className="flex-1 hidden lg:flex items-center  justify-center">
        <XSvg className="lg:w-2/3 fill-black" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <XSvg className="w-24 lg:hidden fill-black" />
          <h1 className="text-4xl font-extrabold text-black">{"Let's"} go.</h1>
          {loginMutation.isError && (
            <p className="text-red-500">{loginMutation.error.message}</p>
          )}
          <label className="input input-bordered rounded flex items-center gap-2">
            <FaUser className="text-black" />
            <input
              type="text"
              className="grow"
              placeholder="username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword className="text-black" />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button
            className={twMerge(
              "btn rounded-full btn-primary text-black btn-outline w-full",
              loginMutation.isPending && "cursor-not-allowed opacity-50"
            )}
          >
            {loginMutation.isPending ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-black text-lg">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="btn rounded-full btn-primary text-black btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
