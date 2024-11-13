import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState } from "react";
import { Button } from "@headlessui/react";
import ImageView from "../shared/ImageView";

const PostContent = ({ textContent, images }) => {
  const [readMore, setReadMore] = useState(false);

  const [showReadMoreButton, setShowReadMoreButton] = useState(false);

  const textRef = useRef(null);
  useEffect(() => {
    if (textRef.current) {
      setShowReadMoreButton(
        textRef.current.scrollHeight !== textRef.current.clientHeight
      );
    }
  }, []);

  const handleReadMore = (e) => {
    e.preventDefault();
    setReadMore(!readMore);
  };

  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <span
        ref={textRef}
        className={twMerge(
          `whitespace-pre-line font-thin`,
          readMore ? "line-clamp-none" : "line-clamp-3"
        )}
      >
        {textContent}
      </span>
      {showReadMoreButton && (
        <Button
          // onDragStart={(event) => {
          //   event.preventDefault();
          //   event.stopPropagation();
          // }}
          onClick={handleReadMore}
          className="bg-neutral-200 hover:bg-neutral-100 w-fit py-2 px-4 rounded-lg text-sm font-semibold "
        >
          {readMore ? "Show less" : "Show more"}
        </Button>
      )}

      {images.length > 0 && (
        <ImageView images={images} imagesCount={images.length} />
      )}
    </div>
  );
};

export default PostContent;
