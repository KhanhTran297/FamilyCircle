import useTheme from "../../hooks/useTheme";

const SwitchMode = () => {
  const { selectDark, selectLight, theme } = useTheme({});

  return (
    <div className="flex ">
      <div className="items-center self-stretch hidden gap-2 xl:flex dark:bg-black">
        <div
          className="inline-block cursor-pointer dark:hidden"
          onClick={selectDark}
        >
          <img
            src="src\assets\icons\sun.svg"
            alt=""
            className="w-[33.333px] h-[33.333]"
          />
        </div>
        <div
          className="hidden cursor-pointer dark:inline-block"
          onClick={selectLight}
        >
          <img
            src="src\assets\icons\moon.svg"
            alt="moon"
            className="w-[33.333px] h-[33.333]"
          />
        </div>
        <div className="xl:h-9 xl:w-[136px]">
          <p className="hidden text-white dark:inline-block font-roboto">
            Dark Mode
          </p>
          <p className="dark:hidden font-roboto">Light Mode</p>
        </div>
        <div
          className="flex flex-col items-center rounded-[20px] hover:bg-tab hover:bg-opacity-[8%] justify-center w-10 h-10 gap-[10px] p-[10px] cursor-pointer"
          onClick={theme === "dark" ? selectLight : selectDark}
        >
          <img
            src="src\assets\icons\change.svg"
            alt=""
            className="w-6 h-6 shrink-0"
          />
        </div>
      </div>
    </div>
  );
};

export default SwitchMode;
