import { BiTrash } from "react-icons/bi";
import HeaderWrapper from "./HeaderWrapper";
import { Button } from "@headlessui/react";

const BookmarkHeader = ({ modal }) => {
  return (
    <HeaderWrapper classname={" p-0 py-2"}>
      <div className="px-4 p-2 flex justify-between items-center">
        <h1 className=" text-xl leading-none font-semibold ">Bookmark</h1>
        <Button
          className="hover:brightness-90 hover:bg-neutral-100/90 p-1 rounded-full ease-in-out transition-all"
          onClick={modal.openModal}
        >
          <BiTrash className="w-5 h-5 " />
        </Button>
      </div>
    </HeaderWrapper>
  );
};

export default BookmarkHeader;
