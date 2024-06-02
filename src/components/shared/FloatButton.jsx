import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FloatButton = ({ title, link, icon }) => {
  return (
    <div className="rounded-full absolute bottom-20 right-5 bg-sky-500 hover:bg-opacity-80 transition cursor-pointer p-4">
      <Link href={link} title={title}>
        {icon}
      </Link>
    </div>
  );
};

FloatButton.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default FloatButton;
