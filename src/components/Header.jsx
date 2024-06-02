import PropTypes from "prop-types";
import BackButton from "./shared/BackButton";

const Header = ({ label, showBackArrow = false }) => {
  return (
    <div className="border-b-[1px]  p-4">
      <div className="flex gap-2 items-center">
        {showBackArrow && <BackButton />}
        <h1 className="text-xl font-semibold">{label}</h1>
      </div>
      {/* TODO: Add tabs navigation */}
    </div>
  );
};

Header.propTypes = {
  label: PropTypes.string.isRequired,
  showBackArrow: PropTypes.bool,
};

export default Header;
