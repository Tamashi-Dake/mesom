import { useCallback, useEffect, useState } from "react";
import { useAuthModal } from "../../hooks/useModal";
import Modal from "./shared/Modal";
import Input from "./shared/Input";

const AuthModal = () => {
  const authModal = useAuthModal();

  const [isLogin, setIsLogin] = useState(true);

  // Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Register
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }, [authModal.isOpen, isLogin]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // TODO: Add Login and Register

      authModal.onclose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [authModal]);

  const loginContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder={"Username"}
        onChanged={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />

      <Input
        placeholder={"Password"}
        onChanged={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const registerContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder={"Username"}
        onChanged={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder={"Password"}
        onChanged={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
      <Input
        placeholder={"Confirm Password"}
        onChanged={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        disabled={isLoading}
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
      disabled={isLoading}
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
