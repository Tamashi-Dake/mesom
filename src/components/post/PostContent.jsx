import { twMerge } from "tailwind-merge";
import { gridImages } from "../shared/config";

const PostContent = ({ textContent, images }) => {
  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <span>{textContent}</span>
      {images?.length > 0 && (
        <div
          className={`grid gap-[2px] rounded-lg overflow-hidden ${
            gridImages[images.length - 1]
          }`}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className={twMerge(
                "h-full w-full object-cover ",
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
