import UseCallApi from "../hooks/UseCallApi";

const { UsePost, UseGet } = UseCallApi();
export const createConversationApi = (params) => {
  const url = "/v1/conversation/create";
  return UsePost({ url, params, requiredToken: true });
};
//list conversation
export const listConversationApi = () => {
  const url = "/v1/conversation/list-conversation";
  return UseGet({ url, requiredToken: true });
};
//Get conversation by id
export const getConversationByIdApi = (params) => {
  const url = `/v1/conversation/get/${params.queryKey[1]}`;
  return UseGet({ url, requiredToken: true });
};
//list conversation by conversationId
export const listConversationByConversationIdApi = (params) => {
  const url = `/v1/conversation/list-conversation-account?conversationId=${params.queryKey[1]}`;
  return UseGet({ url, requiredToken: true });
};
