import {
  BsBell,
  BsChatDots,
  BsHouse,
  BsInfoCircle,
  BsPerson,
} from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { FaFeather } from "react-icons/fa6";
import { IoEarthOutline } from "react-icons/io5";
export const routes = [
  { name: "Home", path: "/", icon: <BsHouse size={24} color="black" /> },
  {
    name: "Discovery",
    path: "/discovery",
    icon: <IoEarthOutline size={24} color="black" />,
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
