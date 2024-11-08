import { BiTrash } from "react-icons/bi";
import HeaderWrapper from "./HeaderWrapper";
import { Button } from "@headlessui/react";

const BookmarkHeader = () => {
  return (
    <HeaderWrapper classname={" p-0 py-2"}>
      <div className="px-4 p-2 flex justify-between items-center">
        <h1 className=" text-xl leading-none font-semibold ">Bookmark</h1>
        <Button
          className="hover:brightness-90 hover:bg-neutral-100/90 p-2 rounded-full ease-in-out transition-all"
          onClick={() => alert("open menu:  delete all(premium)")}
        >
          <BiTrash className="text-red-500" />
        </Button>
      </div>
    </HeaderWrapper>
  );
};

export default BookmarkHeader;
