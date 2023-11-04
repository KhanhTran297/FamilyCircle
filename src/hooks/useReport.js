import { useMutation, useQuery } from "@tanstack/react-query";
import {
  approveReportApi,
  createReportApi,
  getListReportApi,
  rejectReportApi,
} from "../api/report";
import { message } from "antd";

function useReport(kind, size, page) {
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
  const {
    data: listReport,
    refetch: getListReport,

    isLoading: loadingGetListreport,
  } = useQuery({
    queryKey: ["getListReport"],
    queryFn: () => getListReportApi(kind, size, page),
    enabled: kind ? true : false,
    onSuccess: () => {
      message.success("Get list report success");
    },
  });
  const { mutateAsync: approveReport } = useMutation({
    mutationFn: approveReportApi,
    onSuccess: () => {
      message.success("Approve report success");
      getListReport();
    },
  });
  const { mutateAsync: rejectReport } = useMutation({
    mutationFn: rejectReportApi,
    onSuccess: () => {
      message.success("Reject report success");
      getListReport();
    },
  });
  return {
    createReport,
    listReport,
    getListReport,
    loadingGetListreport,
    approveReport,
    rejectReport,
  };
}
export default useReport;
