import { twMerge } from "tailwind-merge";
import DefaultHeader from "../layout/DefaultHeader";
import { Modal } from "./Modal";
import { useMemo, useRef, useState } from "react";
import { FaCamera, FaChevronRight } from "react-icons/fa";
import { ToolTip } from "../common/Tooltip";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import InputField from "../shared/LabeledInput";
import { Button as DefaultButton } from "@headlessui/react";
import Button from "../shared/Button";

// TODO: Refactor + Add skeleton loading while update
const UpdateUserModal = ({ modal, user, userMutate }) => {
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
  const inputNameError = !editUserData.displayName?.trim()
    ? "Name can't be blank"
    : "";

  const coverInputFileRef = useRef(null);
  const avatarInputFileRef = useRef(null);

  const maxFileSize = useMemo(() => {
    5 * 1024 * 1024;
  }, []);

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

  const handleChange =
    (key) =>
    ({ target: { value } }) =>
      setEditUserData({ ...editUserData, [key]: value });

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

    userMutate.mutate(postData);

    modal.closeModal();
  };

  return (
    <Modal
      className="flex items-start justify-center"
      modalClassName="bg-main-background text-main-primary relative rounded-2xl max-w-xl w-full my-8 overflow-hidden"
      open={modal.open}
      closeModal={modal.closeModal}
    >
      <DefaultHeader label="Edit profile" className={"flex justify-between"}>
        <Button
          label={"Save"}
          className={"inline-block"}
          onClick={handleSubmit}
          disabled={
            userMutate.isLoading || userMutate.isPending || inputNameError
          }
        />
      </DefaultHeader>
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
            <DefaultButton
              className="group/inner relative rounded-full bg-neutral-700/50 p-3 hover:bg-neutral-600/50 focus-visible:bg-neutral-600/50"
              onClick={() => coverInputFileRef.current.click()}
            >
              <FaCamera className="hover-animation h-6 w-6 text-neutral-100 focus-visible:text-white group-hover/inner:text-white" />
              <ToolTip groupInner tip="Add photo" />
            </DefaultButton>
            {userImages.coverImg && (
              <DefaultButton
                className="group/inner relative rounded-full bg-neutral-700/50 p-3 hover:bg-neutral-600/50 focus-visible:bg-neutral-600/50"
                onClick={removeCoverImage}
              >
                <AiOutlineClose className="hover-animation h-6 w-6 text-neutral-100 focus-visible:text-white group-hover/inner:text-white" />
                <ToolTip groupInner tip="Remove photo" />
              </DefaultButton>
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
                  className="h-full w-full rounded-full border-4 border-white bg-white object-cover object-center transition duration-200 group-focus-within:brightness-75 group-hover:brightness-75 inner:!m-1 inner:rounded-full"
                  src={previewImages.avatarImg || user.profile.avatarImg}
                />
              ) : (
                <div className="h-full w-full rounded-full border-4 border-white bg-neutral-200"></div>
              )}
              <DefaultButton
                className="group/inner absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-700/50 p-3 hover:bg-neutral-600/50 focus-visible:bg-neutral-600/50"
                onClick={() => avatarInputFileRef.current.click()}
              >
                <FaCamera className="hover-animation h-6 w-6 text-neutral-100 focus-visible:text-white group-hover/inner:text-white" />
                <ToolTip groupInner tip="Add photo" />
              </DefaultButton>
            </div>
          </div>
          {inputFields.map((field) => (
            <>
              <InputField
                {...field}
                handleChange={handleChange(field.inputId)}
                key={field.inputId}
              />
            </>
          ))}

          <DefaultButton className="accent-tab mb-4 flex cursor-not-allowed items-center justify-between rounded-none py-2 hover:bg-light-primary/10 active:bg-light-primary/20 disabled:brightness-100 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20">
            <span className="mx-2 text-xl">Switch to professional</span>
            <i>
              <FaChevronRight className="h-6 w-6 text-main-secondary" />
            </i>
          </DefaultButton>
        </div>
      </section>
    </Modal>
  );
};

export default UpdateUserModal;
