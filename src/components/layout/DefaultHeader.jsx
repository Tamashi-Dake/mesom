import BackButton from "../shared/BackButton";
import HeaderWrapper from "./HeaderWrapper";

const DefaultHeader = ({
  label,
  additionalContent,
  showBackArrow = false,
  children,
  className,
}) => {
  return (
    <HeaderWrapper classname={className}>
      <div className="flex items-center gap-4">
        {showBackArrow && <BackButton />}
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-semibold leading-none">{label}</h1>
          <h2 className="text-sm text-neutral-500">{additionalContent}</h2>
        </div>
      </div>
      {children}
    </HeaderWrapper>
  );
};

export default DefaultHeader;
