import { useCallback, useEffect, useState } from "react";
import { useAuthModal } from "../../hooks/useModal";
import Modal from "./shared/Modal";
import Input from "./shared/Input";
import toast from "react-hot-toast";
import usePostData from "../../hooks/usePostData";

const AuthModal = () => {
  const authModal = useAuthModal();

  const [isLogin, setIsLogin] = useState(true);

  // Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Register
  const [confirmPassword, setConfirmPassword] = useState("");

  // const [isLoading, setIsLoading] = useState(false);

  const registerMutation = usePostData({
    onSuccess: (response) => {
      toast.success("Registered successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while registering");
      console.error("An error occurred while registering:", error);
    },
  });

  const loginMutation = usePostData({
    onSuccess: (response) => {
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while logging in");
      console.error("An error occurred while logging in:", error);
    },
  });

  useEffect(() => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }, [authModal.isOpen, isLogin]);

  const onSubmit = useCallback(async () => {
    try {
      if (isLogin) {
        loginMutation.mutate({
          url: "/auth/login",
          data: {
            username: username,
            password: password,
          },
        });
      } else {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        registerMutation.mutate({
          url: "/auth/register",
          data: {
            username: username,
            password: password,
          },
        });
      }
    } catch (error) {
      toast.error("Authentication failed", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authModal, username, password, confirmPassword]);

  // TODO: Disable button when input is empty, disable button, input when loading
  const loginContent = (
    <div className="flex flex-col gap-4">
      {loginMutation.isError && (
        <span className="text-red-500 text-center font-semibold text-lg">
          {loginMutation.error.response.data.message}
        </span>
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
      {registerMutation.isError && (
        <span className="text-red-500 text-center font-semibold text-lg">
          {registerMutation.error.response.data.message}
        </span>
      )}
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
        {isLogin ? "Create an account" : "Login"}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={authModal.isOpen}
      disabled={registerMutation.isLoading || loginMutation.isLoading}
      title={isLogin ? "Login" : "Register"}
      actionLabel={isLogin ? "Login" : "Sign up"}
      onClose={authModal.onClose}
      onSubmit={onSubmit}
      body={isLogin ? loginContent : registerContent}
      footer={footerContent}
    />
  );
};

export default AuthModal;
