import { useLocalStorage, usePreferredDark } from "@reactuses/core";
import { useCallback, useEffect } from "react";
import { atom, useRecoilState } from "recoil";

const themeAtom = atom({
  key: "useTheme__theme",
  default: localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : "system",
});

function useTheme({ init = false }) {
  // global reactive state theme
  const [theme, setTheme] = useRecoilState(themeAtom);

  // reactive theme in localstorage
  const [localTheme, setLocalTheme] = useLocalStorage("theme", "system");

  // reactive os theme
  const isOSDark = usePreferredDark();

  // check os theme change -> add/remove dark class
  const onWindowMatches = useCallback(() => {
    // If theme is 'dark' or (theme is 'system' and isOSDark) -> add dark
    if (
      localStorage.theme === "dark" ||
      (localStorage.theme === "system" && isOSDark)
    ) {
      // Chạy đi đâu
      // document.documentElement.classList.add("dark");
    } else {
      // console.log('Từ Dark sang System')
      document.documentElement.classList.remove("dark");
    }
  }, [isOSDark]);

  // select dark theme
  const selectDark = useCallback(() => {
    setTheme("dark");
    setLocalTheme("dark");
    document.documentElement.classList.add("dark");
  }, [setTheme, setLocalTheme]);

  // select light theme
  const selectLight = useCallback(() => {
    setTheme("light");
    setLocalTheme("light");
    // Remove "dark" in html class
    document.documentElement.classList.remove("dark");
  }, [setTheme, setLocalTheme]);

  // select os theme
  const selectSystem = useCallback(() => {
    setTheme("system");
    // remove "theme" in localstorage
    setLocalTheme("system");
    // set theme with window matches
    onWindowMatches();
  }, [setTheme, setLocalTheme, onWindowMatches]);

  // Listen OS change
  // Every OS theme change -> call function
  useEffect(() => {
    onWindowMatches();
  }, [onWindowMatches]);

  // Mounted -> using theme in localstorage
  // Mounted -> init Window Matches
  useEffect(() => {
    if (init) {
      switch (theme) {
        case "light":
          selectLight();
          break;
        case "dark":
          selectDark();
          break;
        case "system":
          selectSystem();
          break;
        default:
          selectSystem();
          break;
      }

      onWindowMatches();
    }
  }, []);

  return {
    theme,
    localTheme,
    selectDark,
    selectLight,
    selectSystem,
    onWindowMatches,
  };
}

export default useTheme;
