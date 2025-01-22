import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const FloatButton = ({ title, link, icon }) => {
  return (
    <div className="fixed bottom-20 right-5 cursor-pointer rounded-full bg-main-accent p-4 transition hover:bg-opacity-80 xs:hidden">
      <Link to={link} title={title}>
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
