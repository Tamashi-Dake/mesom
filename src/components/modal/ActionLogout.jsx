import toast from "react-hot-toast";
import { logout } from "../../services/authService";
import { Modal } from "./Modal";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActionModal } from "./ActionModal";

const ActionLogout = ({ modal }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate("/auth");
  };
  return (
    <Modal
      modalClassName="max-w-xs relative text-main-primary bg-main-background w-full p-8 rounded-2xl"
      open={modal.open}
      closeModal={modal.closeModal}
      actionModal
    >
      <ActionModal
        title="Log out of Mesom?"
        description={`You can always log back in at any time. If you log out, you will need to have your username and password to log back in.`}
        mainBtnClassName="bg-main-accent/80 hover:bg-main-accent "
        mainBtnLabel="Log out"
        action={handleLogout}
        closeModal={modal.closeModal}
      />
    </Modal>
  );
};

export default ActionLogout;
