import { FaFeather } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuthModal } from "../../hooks/useModal";

const RouteCreatePost = () => {
  const authModal = useAuthModal();
  return (
    <div className="mx-auto flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-main-accent p-4 transition hover:bg-opacity-80 sm:w-full">
      <Link
        to="/"
        className="flex items-center justify-center gap-4"
        onClick={authModal.onOpen}
      >
        <FaFeather size={24} color="white" />
        <span className="hidden text-white xl:block">Create Post</span>
      </Link>
    </div>
  );
};

export default RouteCreatePost;
