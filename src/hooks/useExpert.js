import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { createExpertAccountApi } from "../api/expert";

function useExpert() {
  const { mutate: createExpert } = useMutation({
    mutationFn: createExpertAccountApi,
    onSuccess: () => {
      message.success("Create expert successfully");
    },
  });
  return {
    createExpert,
  };
}
export default useExpert;
