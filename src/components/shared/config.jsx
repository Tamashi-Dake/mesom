import { BiSearch } from "react-icons/bi";
import {
  BsBell,
  BsChatDots,
  BsHouse,
  BsInfoCircle,
  BsPerson,
} from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaFeather } from "react-icons/fa6";
export const routes = [
  { name: "Home", path: "/", icon: <BsHouse size={24} color="black" /> },
  {
    name: "Search",
    path: "/search",
    icon: <BiSearch size={24} color="black" />,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: <BsBell size={24} color="black" className="shrink-0" />,
  },
  {
    name: "Messages",
    path: "/messages",
    icon: <BsChatDots size={24} color="black" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <BsPerson size={24} color="black" />,
  },
  {
    name: "About",
    path: "/about",
    icon: <BsInfoCircle size={24} color="black" />,
  },
];

export const config = {
  "/profile": {
    title: "Messages",
    link: "/messages",
    icon: <CiMail size={24} color="white" />,
  },
  "/": {
    title: "Create Post",
    link: "/",
    icon: <FaFeather size={24} color="white" />,
  },
};

export const gridImages = [
  "grid-cols-1", // for 1 image
  "grid-cols-2", // for 2 images
  // TODO: change fixed height
  "grid-rows-2 grid-cols-2 max-h-60", // for 3 images
  "grid-rows-2 grid-cols-2 max-h-60", // for 4 images
];

// Backdrop variant for fade-in effect
export const backdropVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Modal variant with scale effect
export const modalVariant = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 0.5, bounce: 0.4 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};
