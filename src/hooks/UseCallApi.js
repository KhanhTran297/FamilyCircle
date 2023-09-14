import { instance } from "../api/instance";
import UseCookie from "./UseCookie";

function UseCallApi() {
  const { getToken } = UseCookie();
  //GET
  const UseGet = ({
    url = "",
    params = {},
    headers = {},
    requiredToken = false,
  } = {}) => {
    // Get all header
    let fullHeader = { ...headers };
    // If required TOKEN -> Get Access Token from Cookies
    // console.log("requiredToken:", requiredToken);
    requiredToken &&
      (fullHeader["Authorization"] = `Bearer ${getToken().access_token}`);

    const usedGet = () =>
      instance.get(
        url,
        // { params },
        {
          headers: {
            ...instance.defaults.headers,
            ...fullHeader,
          },
        },
        {
          params,
        }
      );
    return usedGet();
  };
  //POST
  const UsePost = ({
    url = "",
    params = {},
    headers = {},
    requiredToken = false,
  } = {}) => {
    // Get all header
    let fullHeader = { ...headers };
    // If required TOKEN -> Get Access Token from Cookies
    // console.log("requireToken post", requiredToken);
    requiredToken &&
      (fullHeader["Authorization"] = `Bearer ${getToken().access_token}`);

    const usedPost = () =>
      instance.post(
        url,
        { ...params },
        {
          headers: {
            ...instance.defaults.headers,
            ...fullHeader,
          },
        }
      );
    return usedPost();
  };
  //DELETE
  const UseDelete = ({
    url = "",
    params = {},
    headers = {},
    requiredToken = false,
  } = {}) => {
    // Get all header
    let fullHeader = { ...headers };
    // If required TOKEN -> Get Access Token from Cookies
    requiredToken &&
      (fullHeader["Authorization"] = `Bearer ${getToken().access_token}`);

    const usedDelete = () =>
      instance.delete(
        url,
        {
          headers: {
            ...instance.defaults.headers,
            ...fullHeader,
          },
        },
        { ...params }
      );
    return usedDelete();
  };
  //Edit
  const UseEdit = ({
    url = "",
    params = {},
    headers = {},
    requiredToken = false,
  } = {}) => {
    // Get all header
    let fullHeader = { ...headers };
    // If required TOKEN -> Get Access Token from Cookies
    // console.log("requiredToken:", requiredToken);
    requiredToken &&
      (fullHeader["Authorization"] = `Bearer ${getToken().access_token}`);

    const usedEdit = () =>
      instance.put(
        url,
        { ...params },
        {
          headers: {
            ...instance.defaults.headers,
            ...fullHeader,
          },
        }
      );
    return usedEdit();
  };
  return { UseGet, UsePost, UseDelete, UseEdit };
}
export default UseCallApi;
