import { FaFeather } from "react-icons/fa6";
import { Link } from "react-router-dom";

const RouteCreatePost = () => {
  return (
    <div className="rounded-full h-14 w-14 sm:w-full p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
      <Link to="/" className="flex items-center justify-center gap-4">
        <FaFeather size={24} color="white" />
        <span className="hidden md:block text-white">Create Post</span>
      </Link>
    </div>
  );
};

export default RouteCreatePost;
