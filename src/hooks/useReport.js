import { useMutation } from "@tanstack/react-query";
import { createReportApi } from "../api/report";

function useReport() {
  //createReport
  const { mutate: createReport } = useMutation({
    mutationFn: createReportApi,
    onSuccess: (respone) => {
      console.log(respone);
    },
    onError: () => {
      // useError("Save fail!!!!");
    },
  });
  return { createReport };
}
export default useReport;
