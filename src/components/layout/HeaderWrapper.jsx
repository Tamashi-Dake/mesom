import { twMerge } from "tailwind-merge";

const HeaderWrapper = ({ children, classname }) => {
  return (
    <div
      className={twMerge(
        "border-b-[1px] p-4 sticky top-0 bg-white/60 backdrop-blur-xl z-10",
        classname
      )}
    >
      {children}
    </div>
  );
};

export default HeaderWrapper;
