import { twMerge } from "tailwind-merge";
import DefaultHeader from "../layout/DefaultHeader";
import { Modal } from "./Modal";
import { useRef, useState } from "react";
import { FaCamera, FaChevronRight } from "react-icons/fa";
import { ToolTip } from "../common/Tooltip";
import { Button } from "@headlessui/react";

const UpdateUserModal = ({ modal }) => {
  const coverInputFileRef = useRef(null);
  const profileInputFileRef = useRef(null);

  const [editUserData, setEditUserData] = useState({
    name: "",
    bio: "",
    location: "",
    website: "",
  });

  const [inputNameError, setInputNameError] = useState(null);

  // TODO: Validate Form input (trim)
  const inputFields = [
    {
      label: "Name",
      inputId: "name",
      inputValue: editUserData.name,
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
    },
  ];

  // Hàm thay đổi giá trị khi người dùng nhập vào
  const handleChange = (e, inputId) => {
    const value = e.target.value;

    // Cập nhật dữ liệu trong editUserData
    setEditUserData((prevData) => ({
      ...prevData,
      [inputId]: value,
    }));

    // Ví dụ kiểm tra lỗi cho trường "name"
    if (inputId === "name" && value.length > 50) {
      setInputNameError("Name cannot exceed 50 characters");
    } else {
      setInputNameError(null);
    }
  };

  return (
    <Modal
      className="flex items-start justify-center "
      modalClassName="bg-white relative rounded-2xl max-w-xl w-full my-8 overflow-hidden"
      open={modal.open}
      closeModal={modal.closeModal}
    >
      {/* TODO: change to Update Profile Header */}
      <DefaultHeader label="Edit profile">{/* ... */}</DefaultHeader>
      <section
        className={twMerge(
          "h-full overflow-y-auto transition-opacity"
          // loading && 'pointer-events-none opacity-50'
        )}
      >
        <div className="group relative mt-[52px] h-36 xs:h-44 sm:h-48">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={coverInputFileRef}
            // onChange={editImage('cover')}
          />
          {/* {coverPhotoURL ? (
            <img
              className='relative h-full object-cover transition group-hover:brightness-75 duration-200
                            group-focus-within:brightness-75'
              src={coverPhotoURL}
              alt={name}
              layout='fill'
            />
          ) : ( */}
          <div className="h-full bg-light-line-reply dark:bg-dark-line-reply" />
          {/* )} */}
          <div className="absolute left-1/2 top-1/2 flex -translate-y-1/2 -translate-x-1/2 gap-4">
            <Button
              className="group/inner relative bg-light-primary/60 p-2 hover:bg-image-preview-hover/50
                         focus-visible:bg-image-preview-hover/50"
              // onClick={handleClick('cover')}
            >
              <FaCamera className="hover-animation h-6 w-6 text-dark-primary group-hover:text-white" />
              <ToolTip groupInner tip="Add photo" />
            </Button>
            {/* {coverPhotoURL && (
              <Button
                className='group/inner relative bg-light-primary/60 p-2 hover:bg-image-preview-hover/50
                           focus-visible:bg-image-preview-hover/50'
                onClick={removeCoverImage}
              >
                <HeroIcon
                  className='hover-animation h-6 w-6 text-dark-primary group-hover:text-white'
                  iconName='XMarkIcon'
                />
                <ToolTip groupInner tip='Remove photo' />
              </Button>
            )} */}
          </div>
        </div>
        <div className="relative flex flex-col gap-6 px-4 py-3">
          <div className="mb-8 xs:mb-12 sm:mb-14">
            <input
              className="hidden"
              type="file"
              accept="image/*"
              ref={profileInputFileRef}
              // onChange={editImage('profile')}
            />
            <div
              className="group absolute aspect-square w-24 -translate-y-1/2
                         overflow-hidden rounded-full xs:w-32 sm:w-36"
            >
              <img
                className=" h-full w-full bg-main-background inner:!m-1 inner:rounded-full rounded-full transition group-hover:brightness-75 duration-200
                              group-focus-within:brightness-75"
                // src={photoURL}
                alt={name}
                // layout='fill'
              />
              <Button
                className="group/inner absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                           bg-light-primary/60 p-2 hover:bg-image-preview-hover/50 
                           focus-visible:bg-image-preview-hover/50"
                // onClick={handleClick('profile')}
              >
                <FaCamera className="hover-animation h-6 w-6 text-dark-primary group-hover:text-white" />
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              ) : (
                <input
                  id={field.inputId}
                  type="text"
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

          <Button
            className="accent-tab -mx-4 mb-4 flex cursor-not-allowed items-center justify-between rounded-none
                       py-2 hover:bg-light-primary/10 active:bg-light-primary/20 disabled:brightness-100
                       dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20"
          >
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
