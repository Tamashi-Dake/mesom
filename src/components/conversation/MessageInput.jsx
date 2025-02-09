import { useRef, useState } from "react";
// import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  // const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      // await sendMessage({
      //   text: text.trim(),
      //   image: imagePreview,
      // });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="sticky bottom-0 w-full self-end p-4">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-20 w-20 rounded-lg border border-zinc-700 object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute -right-1.5 -top-1.5 m-2 flex h-5 w-5 items-center justify-center rounded-full bg-main-secondary/30"
              type="button"
            >
              <AiOutlineClose className="size-3 text-main-primary" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2">
          <input
            type="text"
            className="w-full rounded-lg border border-main-secondary bg-main-background p-2 text-sm text-main-primary focus:border-main-accent focus:outline-none focus:ring-main-accent"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`flex ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <CiImageOn className="text-main-primary" size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <BsSend className="text-main-accent" size={20} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
