import PropTypes from "prop-types";
import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Modal Background */}
      <div
        className="
        flex
        justify-center items-center
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800
        bg-opacity-70
        "
      >
        <div
          className=" relative
            w-full
            lg:w-3/6
            my-6
            mx-auto lg:max-w-3xl
            h-full lg:h-auto"
        >
          {/* Content  */}
          <div
            className="
                h-full
                lg:h-auto
                border-0
                rounded-lg
                shadow-lg
                relative
                flex
                flex-col
                w-full
                bg-neutral-100
                outline-none
                focus:outline-none"
          >
            {/* Header */}
            <div
              className="
                    flex
                    items-center justify-between
                    p-10
                    rounded-t"
            >
              <h3 className="text-3xl font-semibold text-neutral-800">
                {" "}
                {title}{" "}
              </h3>{" "}
              <button
                className="p1 ml-auto border-0 text-neutral-800 hover:opacity-70 transition"
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/* Body */}
            <div className="relative px-10 py-5 flex-auto">{body}</div>
            {/* Footer */}
            <div className="flex flex-col gap-2 p-10">
              <Button
                label={actionLabel}
                onClick={handleSubmit}
                disabled={disabled}
                secondary
                classNames=""
              />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  body: PropTypes.node,
  footer: PropTypes.node,
  actionLabel: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Modal;
