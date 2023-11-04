import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import {
  createExpertAccountApi,
  getExpertAccountProfilebyIdApi,
} from "../api/expert";

function useExpert(id) {
  const { mutate: createExpert } = useMutation({
    mutationFn: createExpertAccountApi,
    onSuccess: () => {
      message.success("Create expert successfully");
    },
  });
  const { refetch: getExpertAccountProfilebyId, data: expertProfile } =
    useQuery({
      queryKey: ["expertProfile", id],
      queryFn: () => getExpertAccountProfilebyIdApi(id),
      enabled: id ? true : false,
    });
  return {
    getExpertAccountProfilebyId,
    expertProfile,
    createExpert,
  };
}
export default useExpert;
