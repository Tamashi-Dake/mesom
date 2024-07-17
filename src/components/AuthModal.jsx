import { useEffect, useState } from "react";
import { useAuthModal } from "../../hooks/useModal";
import Modal from "./shared/Modal";
import Input from "./shared/Input";
import { useMutation } from "@tanstack/react-query";
import authPoster from "../helper/authentication";
import toast from "react-hot-toast";

const AuthModal = () => {
  const authModal = useAuthModal();

  const [isLogin, setIsLogin] = useState(true);

  // Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Register
  const [confirmPassword, setConfirmPassword] = useState("");

  // const [isLoading, setIsLoading] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (loginData) =>
      authPoster({
        url: `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        data: loginData,
      }),
    onSuccess: (response) => {
      toast.success("Login successful");
    },
    onError: (error) => {
      toast.error("Login failed", error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () =>
      authPoster({
        url: `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        data: {},
      }),
    onSuccess: (response) => {
      toast.success("Logout successful");
    },
    onError: (error) => {
      toast.error("Logout failed", error.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (registerData) =>
      authPoster({
        url: `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        data: registerData,
      }),
    onSuccess: (response) => {
      toast.success("Register successful");
    },
    onError: (error) => {
      toast.error("Register failed", error);
    },
  });

  useEffect(() => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }, [authModal.isOpen, isLogin]);

  const onSubmit = async () => {
    try {
      if (isLogin) {
        loginMutation.mutate({ username, password });
      } else {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        registerMutation.mutate({ username, password });
      }
    } catch (error) {
      toast.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      logoutMutation.mutate();
    } catch (error) {
      toast.error("Logout failed", error);
    }
  };

  const loginContent = (
    <div className="flex flex-col gap-4">
      {loginMutation.isSuccess && (
        <>
          <div className="text-neutral-500">Login successful</div>
          <button onClick={handleLogout}>logout</button>
        </>
      )}
      <Input
        placeholder={"Username"}
        onChanged={(e) => setUsername(e.target.value)}
        value={username}
        disabled={loginMutation.isLoading}
      />

      <Input
        placeholder={"Password"}
        onChanged={(e) => setPassword(e.target.value)}
        value={password}
        disabled={loginMutation.isLoading}
      />
    </div>
  );

  const registerContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder={"Username"}
        onChanged={(e) => setUsername(e.target.value)}
        value={username}
        disabled={registerMutation.isLoading}
      />
      <Input
        placeholder={"Password"}
        onChanged={(e) => setPassword(e.target.value)}
        value={password}
        disabled={registerMutation.isLoading}
      />
      <Input
        placeholder={"Confirm Password"}
        onChanged={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        disabled={registerMutation.isLoading}
      />
    </div>
  );

  const footerContent = (
    <div
      className="flex m-auto mt-4 gap-2 text-neutral-500"
      onClick={() => setIsLogin(!isLogin)}
    >
      <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
      <button className="text-neutral-800 hover:underline font-semibold">
        {isLogin ? "Create an account" : "Sign in"}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={authModal.isOpen}
      disabled={registerMutation.isLoading || loginMutation.isLoading}
      title={isLogin ? "Login" : "Register"}
      actionLabel={isLogin ? "Sign in" : "Sign up"}
      onClose={authModal.onClose}
      onSubmit={onSubmit}
      body={isLogin ? loginContent : registerContent}
      footer={footerContent}
    />
  );
};

export default AuthModal;
