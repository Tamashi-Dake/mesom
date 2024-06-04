import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Input = ({
  placeholder,
  value,
  type,
  disabled,
  onChanged,
  className,
}) => {
  return (
    <input
      disabled={disabled}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChanged}
      className={twMerge(
        "px-4 py-2 text-lg border-2 border-neutral-200 text-neutral-900 placeholder-neutral-500 bg-neutral-100   rounded-md outline-none focus:border-sky-500 focus:border-2 transition",
        disabled
          ? "bg-neutral-500 opacity-70 cursor-not-allowed"
          : "cursor-text",
        className
      )}
    />
  );
};

Input.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChanged: PropTypes.func,
  className: PropTypes.string,
};

export default Input;
