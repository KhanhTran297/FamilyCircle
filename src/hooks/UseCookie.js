import Cookies from "js-cookie";

function UseCookie() {
  // const accessTokenKey = import.meta.env.VITE_ACCESS_TOKEN;
  //   const refreshTokenKey = import.meta.env.VITE_REFRESH_TOKEN;
  const objCookies = {
    expires: 30,
    secure: true,
    path: "/",
    // domain: process.env.COOKIE_DOMAIN,
  };
  const saveToken = (access_token) => {
    Cookies.set("accessToken", access_token, {
      ...objCookies,
    });
  };

  const getToken = () => {
    const access_token = Cookies.get("accessToken");
    return {
      access_token,
    };
  };
  const removeToken = () => {
    Cookies.remove("accessToken", {
      ...objCookies,
    });
  };
  const isLoggedIn = () => !!getToken().access_token;

  //------------------------- Co refreshToken--------------------
  //   const saveToken = (access_token, refresh_token) => {
  //     if (access_token && refresh_token) {
  //       Cookies.set(accessTokenKey, access_token, {
  //         ...objCookies,
  //       });
  //       Cookies.set(refreshTokenKey, refresh_token, {
  //         ...objCookies,
  //       });
  //     } else {
  //       Cookies.remove(accessTokenKey, {
  //         ...objCookies,
  //         path: "/",
  //         // domain: process.env.COOKIE_DOMAIN,
  //       });
  //       Cookies.remove(refreshTokenKey, {
  //         ...objCookies,
  //         path: "/",
  //         // domain: process.env.COOKIE_DOMAIN,
  //       });
  //     }
  //   };

  //   const getToken = () => {
  //     const access_token = Cookies.get(accessTokenKey);
  //     const refresh_token = Cookies.get(refreshTokenKey);
  //     return {
  //       access_token,
  //       refresh_token,
  //     };
  //   };
  //   const logOut = () => {
  //     const access_token = Cookies.get(accessTokenKey);
  //     if (access_token) {
  //       Cookies.remove(accessTokenKey, {
  //         ...objCookies,
  //       });
  //       Cookies.remove(refreshTokenKey, {
  //         ...objCookies,
  //       });
  //     }
  //   };
  return {
    isLoggedIn,
    saveToken,
    getToken,
    removeToken,
  };
}
export default UseCookie;
