import { useMutation } from "@tanstack/react-query";
import { createReportApi } from "../../api/report";
function useReportMutate() {
  const { mutateAsync: createReport } = useMutation({
    mutationFn: createReportApi,
    onSuccess: (respone) => {},
    onError: () => {
      // useError("Save fail!!!!");
    },
  });
  return {
    createReport,
  };
}
export default useReportMutate;
