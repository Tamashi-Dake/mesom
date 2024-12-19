import { twMerge } from "tailwind-merge";
import DefaultHeader from "../layout/DefaultHeader";
import { Modal } from "./Modal";
import { useRef, useState } from "react";
import { FaCamera, FaChevronRight } from "react-icons/fa";
import { ToolTip } from "../common/Tooltip";
import { Button } from "@headlessui/react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/userService";

// TODO: Refactor + Add skeleton loading while update
const UpdateUserModal = ({ modal, user }) => {
  const queryClient = useQueryClient();
  const [userImages, setUserImages] = useState({
    avatarImg: null,
    coverImg: null,
  });
  const [previewImages, setPreviewImages] = useState({
    avatarImg: null,
    coverImg: null,
  });
  const [editUserData, setEditUserData] = useState({
    displayName: user.displayName || "",
    bio: user.profile.bio || "",
    location: user.profile.location || "",
    website: user.profile.website || "",
  });
  const [inputNameError, setInputNameError] = useState(null);

  const coverInputFileRef = useRef(null);
  const avatarInputFileRef = useRef(null);

  const userMutate = useMutation({
    mutationFn: updateUser,
    onMutate: () => {
      console.log("changing");
    },
    onSuccess: () => {
      toast.success("Updated successfully");

      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // use memo
  const maxFileSize = 5 * 1024 * 1024;

  // TODO: Validate Form input (trim)
  const inputFields = [
    {
      label: "Name",
      inputId: "displayName",
      inputValue: editUserData.displayName,
      inputLimit: 50,
      errorMessage: inputNameError,
    },
    {
      label: "Bio",
      inputId: "bio",
      inputValue: editUserData.bio,
      inputLimit: 160,
      useTextArea: true,
    },
    {
      label: "Location",
      inputId: "location",
      inputValue: editUserData.location,
      inputLimit: 30,
    },
    {
      label: "Website",
      inputId: "website",
      inputValue: editUserData.website,
      inputLimit: 100,
      type: "url",
    },
  ];

  const handleImgChange = (e, imgType) => {
    const file = e.target.files[0];

    if (file?.size > maxFileSize) {
      return toast.error(
        "Seleted image are too large! Please select image smaller than 5MB.",
      );
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUserImages((prevImages) => ({
        ...prevImages,
        [imgType]: file,
      }));
      setPreviewImages((prevPreviewImages) => ({
        ...prevPreviewImages,
        [imgType]: reader.result,
      }));
    };
    reader.onerror = (error) => {
      toast.error("Error when reading file: ", error);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e, inputId) => {
    const value = e.target.value;

    setEditUserData((prevData) => ({
      ...prevData,
      [inputId]: value,
    }));

    if (inputId === "displayName" && value.length > 50) {
      setInputNameError("Name cannot exceed 50 characters");
    } else {
      setInputNameError(null);
    }
  };

  const removeCoverImage = () => {
    setUserImages({
      ...userImages,
      coverImg: null,
    });
    setPreviewImages({
      ...previewImages,
      coverImg: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = new FormData();
    Object.entries(editUserData).forEach(([key, value]) => {
      postData.append(key, value);
    });

    if (userImages.avatarImg) {
      postData.append("avatarImg", userImages.avatarImg);
    }
    if (userImages.coverImg) {
      postData.append("coverImg", userImages.coverImg);
    }

    userMutate.mutate({ userId: user._id, postData });

    modal.closeModal();
  };

  return (
    <Modal
      className="flex items-start justify-center"
      modalClassName="bg-white relative rounded-2xl max-w-xl w-full my-8 overflow-hidden"
      open={modal.open}
      closeModal={modal.closeModal}
    >
      {/* TODO: change to Update Profile Header */}
      <DefaultHeader label="Edit profile">{/* ... */}</DefaultHeader>
      <section
        className={twMerge(
          "h-full overflow-y-auto transition-opacity",
          // loading && 'pointer-events-none opacity-50'
        )}
      >
        <div className="group relative h-36 overflow-hidden xs:h-44 sm:h-48">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={coverInputFileRef}
            onChange={(event) => handleImgChange(event, "coverImg")}
          />
          {userImages.coverImg || user.profile.coverImg ? (
            <img
              className="relative h-full w-full object-cover object-center transition duration-200 group-focus-within:brightness-75 group-hover:brightness-75"
              src={previewImages.coverImg || user.profile.coverImg}
            />
          ) : (
            <div className="h-full w-full bg-neutral-200"></div>
          )}
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-4">
            <Button
              className="group/inner relative rounded-full bg-neutral-700/50 p-3 hover:bg-neutral-600/50 focus-visible:bg-neutral-600/50"
              onClick={() => coverInputFileRef.current.click()}
            >
              <FaCamera className="hover-animation h-6 w-6 text-neutral-100 focus-visible:text-white group-hover/inner:text-white" />
              <ToolTip groupInner tip="Add photo" />
            </Button>
            {userImages.coverImg && (
              <Button
                className="group/inner relative rounded-full bg-neutral-700/50 p-3 hover:bg-neutral-600/50 focus-visible:bg-neutral-600/50"
                onClick={removeCoverImage}
              >
                <AiOutlineClose className="hover-animation h-6 w-6 text-neutral-100 focus-visible:text-white group-hover/inner:text-white" />
                <ToolTip groupInner tip="Remove photo" />
              </Button>
            )}
          </div>
        </div>
        <div className="relative flex flex-col gap-6 px-4 py-3">
          <div className="mb-8 xs:mb-12 sm:mb-14">
            <input
              className="hidden"
              type="file"
              accept="image/*"
              ref={avatarInputFileRef}
              onChange={(event) => handleImgChange(event, "avatarImg")}
            />
            <div className="group absolute aspect-square w-24 -translate-y-1/2 overflow-hidden rounded-full xs:w-32 sm:w-36">
              {userImages.avatarImg || user.profile.avatarImg ? (
                <img
                  className="inner:!m-1 inner:rounded-full h-full w-full rounded-full border-4 border-white bg-white object-cover object-center transition duration-200 group-focus-within:brightness-75 group-hover:brightness-75"
                  src={previewImages.avatarImg || user.profile.avatarImg}
                />
              ) : (
                <div className="h-full w-full rounded-full border-4 border-white bg-neutral-200"></div>
              )}
              <Button
                className="group/inner absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-700/50 p-3 hover:bg-neutral-600/50 focus-visible:bg-neutral-600/50"
                onClick={() => avatarInputFileRef.current.click()}
              >
                <FaCamera className="hover-animation h-6 w-6 text-neutral-100 focus-visible:text-white group-hover/inner:text-white" />
                <ToolTip groupInner tip="Add photo" />
              </Button>
            </div>
          </div>
          {/* TODO: use Input component */}
          {inputFields.map((field, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={field.inputId}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              {field.useTextArea ? (
                <textarea
                  id={field.inputId}
                  value={field.inputValue}
                  maxLength={field.inputLimit}
                  onChange={(e) => handleChange(e, field.inputId)}
                  className="mt-1 block h-[12ch] w-full resize-none rounded-md border-gray-300 text-9xl shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              ) : (
                <input
                  id={field.inputId}
                  type={field.type || "text"}
                  value={field.inputValue}
                  maxLength={field.inputLimit}
                  onChange={(e) => handleChange(e, field.inputId)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              )}
              {field.errorMessage && (
                <p className="mt-1 text-sm text-red-500">
                  {field.errorMessage}
                </p>
              )}
            </div>
          ))}
          <Button onClick={handleSubmit}>Update</Button>
          <Button className="accent-tab -mx-4 mb-4 flex cursor-not-allowed items-center justify-between rounded-none py-2 hover:bg-light-primary/10 active:bg-light-primary/20 disabled:brightness-100 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20">
            <span className="mx-2 text-xl">Switch to professional</span>
            <i>
              <FaChevronRight className="h-6 w-6 text-light-secondary dark:text-dark-secondary" />
            </i>
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default UpdateUserModal;
