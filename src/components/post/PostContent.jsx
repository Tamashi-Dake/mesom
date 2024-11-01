import { twMerge } from "tailwind-merge";
import { gridImages } from "../shared/config";
import { useEffect, useRef, useState } from "react";
import { Button } from "@headlessui/react";

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
          `whitespace-pre-line`,
          readMore ? "line-clamp-none" : "line-clamp-3"
        )}
      >
        {textContent}
      </span>
      {showReadMoreButton && (
        <Button
          onClick={handleReadMore}
          className="bg-neutral-200 hover:bg-neutral-100 w-fit py-2 px-4 rounded-lg text-sm font-semibold"
        >
          {readMore ? "Show less" : "Show more"}
        </Button>
      )}
      {images?.length > 0 && (
        <div
          className={`grid gap-[2px] rounded-lg overflow-hidden max-h-64 ${
            gridImages[images.length - 1]
          }`}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={twMerge(
                "h-full w-full max-h-64",
                images.length === 1 ? "object-contain" : "object-cover",
                images.length === 3 && index === 0 ? "row-span-2" : ""
              )}
              // "h-80 object-contain rounded-lg border border-gray-700"
              alt={`Image ${index}`} // Tạo alt dynamic
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContent;
