import { useMutation, useQuery } from "@tanstack/react-query";
import { createHospitalApi, getListCategoryApi } from "../api/category";
import { message } from "antd";

function useCategory() {
  const { mutate: handleCreateCategory } = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: createHospitalApi,
    onSuccess: (data) => {
      message.success("Create category successfully");
    },
    onError: () => {
      message.error("Create category failed");
    },
  });
  const useGetListCategory = (kind) =>
    useQuery({
      queryKey: ["getListCategory", kind],
      queryFn: () => getListCategoryApi(kind),
      enabled: false,
      retry: 0,
      onSuccess: (data) => {
        // console.log(data);
      },
      onError: () => {
        console.log("error");
      },
    });
  return {
    handleCreateCategory,
    useGetListCategory,
  };
}
export default useCategory;
