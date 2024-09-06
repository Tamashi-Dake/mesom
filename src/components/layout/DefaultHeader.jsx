import PropTypes from "prop-types";
import BackButton from "../shared/BackButton";

const DefaultHeader = ({ label, additionalContent, showBackArrow = false }) => {
  return (
    <div className="border-b-[1px] p-4">
      <div className="flex gap-2 items-center ">
        {showBackArrow && <BackButton />}
        <h1 className="text-xl font-semibold ">{label}</h1>
        <h2 className="text-sm text-neutral-500">{additionalContent}</h2>
      </div>
    </div>
  );
};

DefaultHeader.propTypes = {
  label: PropTypes.string.isRequired,
  additionalContent: PropTypes.string,
  showBackArrow: PropTypes.bool,
};

export default DefaultHeader;
