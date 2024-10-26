import PropTypes from "prop-types";
import BackButton from "../shared/BackButton";

const DefaultHeader = ({ label, additionalContent, showBackArrow = false }) => {
  return (
    // TODO: Add blur transparent when scroll down
    <div className="border-b-[1px] p-4 sticky top-0 bg-white z-10">
      <div className="flex gap-4 items-center ">
        {showBackArrow && <BackButton />}
        <div className="flex flex-col items-start ">
          <h1 className="text-xl leading-none  font-semibold ">{label}</h1>
          <h2 className="text-sm text-neutral-500">{additionalContent}</h2>
        </div>
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
