const Tab = ({ label, isActive, onClick }) => (
  <div
    className="flex justify-center flex-1 p-3 
     transition-all ease-in-out duration-300 cursor-pointer relative select-none"
    onClick={onClick}
  >
    {label}
    <div
      className={`transition-all ease-in-out duration-200 absolute bottom-0 w-10 h-1 rounded-full bg-blue-500 ${
        isActive ? "scale-100" : "scale-0 duration-75"
      }`}
    ></div>
  </div>
);

export default Tab;
