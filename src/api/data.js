import UseCallApi from "../hooks/UseCallApi";

const { UseGet } = UseCallApi();

export const getListWeightApi = (gender, age) => {
  const url = `/v1/data/list-weight-for-age?size=200&age=${age}&gender=${gender}`;
  return UseGet({ url, requiredToken: true });
};
export const getListHeightApi = (gender, age) => {
  const url = `/v1/data/list-length-for-age?size=200&age=${age}&gender=${gender}`;
  return UseGet({ url, requiredToken: true });
};
