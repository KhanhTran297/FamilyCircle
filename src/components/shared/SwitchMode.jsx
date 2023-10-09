import useTheme from "../../hooks/useTheme";
import { ILocalChange } from "../svg/change";
import { ILocalMoon } from "../svg/moon";
import { ILocalSun } from "../svg/sun";

const SwitchMode = () => {
  const { selectDark, selectLight, theme } = useTheme({});
  const textColor = theme === "dark" ? "#CEC4C6" : "#1F1F1F";

  return (
    <div className="flex ">
      <div className="items-center self-stretch hidden gap-2 xl:flex dark:bg-black">
        <div
          className="inline-block cursor-pointer dark:hidden"
          onClick={selectDark}
        >
          <ILocalSun />
        </div>
        <div
          className="hidden cursor-pointer dark:inline-block"
          onClick={selectLight}
        >
          <ILocalMoon />
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
          <ILocalChange className="shrink-0" fill={textColor} />
        </div>
      </div>
    </div>
  );
};

export default SwitchMode;
