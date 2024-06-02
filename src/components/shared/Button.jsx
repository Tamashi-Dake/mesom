import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const Button = ({
  label,
  secondary,
  onClick,
  disabled,
  outline,
  classNames,
}) => {
  return (
    <button
      className={twMerge(
        "px-4 py-2 rounded-full font-semibold transition duration-300 ease-in-out hover:opacity-90",
        secondary
          ? "bg-neutral-800 border-neutral-700 text-white"
          : "bg-sky-500 text-white border-sky-600",
        outline ? "bg-transparent border-sky-500 text-sky-500" : "",
        disabled ? "opacity-70 cursor-not-allowed" : "hover:bg-primary-600",
        classNames
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
Button.propTypes = {
  label: PropTypes.string.isRequired,
  secondary: PropTypes.boolean,
  onClick: PropTypes.func,
  disabled: PropTypes.boolean,
  outline: PropTypes.boolean,
  classNames: PropTypes.string,
};
export default Button;
