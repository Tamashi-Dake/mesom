import PropTypes from "prop-types";
import BackButton from "../shared/BackButton";
import HeaderWrapper from "./HeaderWrapper";

const DefaultHeader = ({ label, additionalContent, showBackArrow = false }) => {
  return (
    <HeaderWrapper>
      <div className="flex gap-4 items-center ">
        {showBackArrow && <BackButton />}
        <div className="flex flex-col items-start ">
          <h1 className="text-xl leading-none  font-semibold ">{label}</h1>
          <h2 className="text-sm text-neutral-500">{additionalContent}</h2>
        </div>
      </div>
    </HeaderWrapper>
  );
};

DefaultHeader.propTypes = {
  label: PropTypes.string.isRequired,
  additionalContent: PropTypes.string,
  showBackArrow: PropTypes.bool,
};

export default DefaultHeader;
