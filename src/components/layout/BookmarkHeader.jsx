import { BiTrash } from "react-icons/bi";
import HeaderWrapper from "./HeaderWrapper";
import { Button } from "@headlessui/react";

const BookmarkHeader = ({ modal }) => {
  return (
    <HeaderWrapper classname={" p-0 py-2"}>
      <div className="flex items-center justify-between p-2 px-4">
        <h1 className="text-xl font-semibold leading-none">Bookmark</h1>
        <Button
          className="rounded-full p-1 transition-all ease-in-out hover:bg-neutral-100/90 hover:text-red-500 hover:brightness-95"
          onClick={modal.openModal}
        >
          <BiTrash className="h-5 w-5" />
        </Button>
      </div>
    </HeaderWrapper>
  );
};

export default BookmarkHeader;
