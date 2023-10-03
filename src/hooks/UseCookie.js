import Cookies from "js-cookie";

function UseCookie() {
  // const "accessToken" = import.meta.env.VITE_ACCESS_TOKEN;
  //   const "refreshToken" = import.meta.env.VITE_REFRESH_TOKEN;
  const objCookies = {
    expires: 30,
    secure: true,
    path: "/",
    // domain: process.env.COOKIE_DOMAIN,
  };
  // const saveToken = (access_token) => {
  //   Cookies.set("accessToken", access_token, {
  //     ...objCookies,
  //   });
  // };

  // const getToken = () => {
  //   const access_token = Cookies.get("accessToken");
  //   return {
  //     access_token,
  //   };
  // };
  // const removeToken = () => {
  //   Cookies.remove("accessToken", {
  //     ...objCookies,
  //   });
  // };
  // const isLoggedIn = () => !!getToken().access_token;

  //------------------------- Co refreshToken--------------------
  const saveToken = (access_token, refresh_token) => {
    if (access_token && refresh_token) {
      Cookies.set("accessToken", access_token, {
        ...objCookies,
      });
      Cookies.set("refreshToken", refresh_token, {
        ...objCookies,
      });
    } else {
      Cookies.remove("accessToken", {
        ...objCookies,
        // domain: process.env.COOKIE_DOMAIN,
      });
      Cookies.remove("refreshToken", {
        ...objCookies,
        // domain: process.env.COOKIE_DOMAIN,
      });
    }
  };

  const getToken = () => {
    const access_token = Cookies.get("accessToken");
    const refresh_token = Cookies.get("refreshToken");
    return {
      access_token,
      refresh_token,
    };
  };
  const removeToken = () => {
    const access_token = Cookies.get("accessToken");
    if (access_token) {
      Cookies.remove("accessToken", {
        ...objCookies,
      });
      Cookies.remove("refreshToken", {
        ...objCookies,
      });
    }
  };
  const isLoggedIn = () => !!getToken().access_token;
  return {
    isLoggedIn,
    saveToken,
    getToken,
    removeToken,
  };
}
export default UseCookie;
