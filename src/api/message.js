import UseCallApi from "../hooks/UseCallApi";

const { UseGet, UsePost } = UseCallApi();
export const listMessageinConversationApi = (params) => {
  const url = `/v1/message/list?conversationId=${params.queryKey[1]}`;

  return UseGet({ url, requiredToken: true });
};
export const createMessageApi = (params) => {
  const url = "/v1/message/send";
  return UsePost({ url, params, requiredToken: true });
};
