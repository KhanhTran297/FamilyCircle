import {
  Avatar,
  Button,
  Drawer,
  Form,
  Modal,
  Space,
  Table,
  message,
} from "antd";
import { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import useReport from "../../hooks/useReport";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { getCommentApi } from "../../api/comment";

const ReportCommentContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [report, setReport] = useState({}); //[0:pending, 1:approved, -2:rejected
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const defaultPage = parseInt(searchParams.get("page")) - 1 || 0;
  const [page, setPage] = useState(defaultPage);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handlePagination2 = async (page) => {
    setPage(page);
  };
  const addKeytoData = (data) => {
    var data2 = [];
    if (data) {
      data.map((item) => {
        data2.push({
          ...item,
          key: item.id,
        });
      });
    }
    return data2;
  };
  const {
    getListReport,
    loadingGetListreport,
    listReport,
    rejectReport,
    approveReport,
  } = useReport(2, 5, page);

  // getPostDetail
  const { refetch: getCommentdetail, data: commentDetail } = useQuery({
    queryKey: ["comment", report?.objectId],
    queryFn: () => getCommentApi(report?.objectId),
    enabled: false,
    retry: 0,
    onSuccess: () => {
      message.success("get post success");
    },
  });
  const hanldeOpenModal = async (report) => {
    setReport(report);
  };

  const handleOk = () => {
    setOpen(false);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "objectId",
      key: "objectId",
      align: "center",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      align: "center",
      render: (_, record) => {
        const rawtime = dayjs(record.createdDate, "DD/MM/YYYY");
        const formatTime = dayjs(rawtime["$d"]).format("DD/MM/YYYY");
        return <p>{formatTime}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => {
        const color =
          (record.status === 0 && "yellow-500") ||
          (record.status === 1 && "green-500") ||
          "red-500";
        return (
          <span className={`bg-${color} p-1 rounded-[5px] `}>
            {record.status === 0 && "Pending"}
            {record.status === 1 && "Approved"}
            {record.status === -2 && "Rejected"}
          </span>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => {
        return (
          <EyeOutlined
            className=" hover:text-blue-400 cursor-pointer"
            onClick={() => {
              hanldeOpenModal(record).then(() => {
                getCommentdetail().then(() => {
                  showDrawer();
                });
              });
            }}
          />
        );
      },
    },
  ];
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: "white",
      }}
      className=" flex flex-col"
    >
      <div className=" border-b-black border-b-[1px] border-b-solid">
        <Form>
          <Form.Item label="Title"></Form.Item>
        </Form>
      </div>
      <div className="">
        <Table
          columns={columns}
          loading={loadingGetListreport}
          dataSource={addKeytoData(listReport?.data?.content)}
          pagination={{
            defaultCurrent: defaultPage + 1,
            pageSize: 5,
            total: listReport?.data?.totalElements,
            onChange: async (page) => {
              await handlePagination2(page - 1);
              await getListReport(1, 5, page - 1);
              setSearchParams({ page: page });
            },
          }}
        />
      </div>
      <Drawer
        title="Detail"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
        extra={
          report?.status === 0 && (
            <Space>
              <Button
                onClick={() => {
                  rejectReport({ id: report?.id }).then(onClose);
                }}
                danger
              >
                Reject
              </Button>
              <Button
                onClick={() => {
                  approveReport({ id: report?.id }).then(onClose);
                }}
                type="default"
              >
                Approve
              </Button>
            </Space>
          )
        }
      >
        <div className=" h-full flex flex-col gap-1 ">
          <div className=" flex flex-col gap-1">
            <p className=" text-light_surface_on_surface font-medium mb-1 border-b border-b-black border-solid">
              User info
            </p>
            <div className="">
              <Avatar src={commentDetail?.data?.owner?.avatar} size={60} />
            </div>
            <p className=" text-light_surface_on_surface opacity-60">
              Fullname:{" "}
              <span className="text-light_surface_on_surface ">
                {commentDetail?.data?.owner?.fullName}
              </span>
            </p>
          </div>
          <div className=" flex flex-col gap-1">
            <p className="text-light_surface_on_surface font-medium mb-1 border-b border-b-black border-solid">
              Comment content
            </p>
            <p className="text-light_surface_on_surface">
              {commentDetail?.data?.commentContent}
            </p>
          </div>
          <div className=" flex flex-col gap-1">
            <p className="text-light_surface_on_surface font-medium mb-1 border-b border-b-black border-solid">
              Reasons
            </p>
            <p className="text-light_surface_on_surface">{report?.content}</p>
          </div>
        </div>
      </Drawer>
      {/* <Modal
        title="Post detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          report?.status === 0
            ? [
                <Button
                  key={"back"}
                  danger
                  onClick={() => {
                    rejectReport({ id: report?.id }).then(() => {
                      setIsModalOpen(false);
                    });
                  }}
                >
                  Reject
                </Button>,
                <Button key={""} onClick={() => showDrawer()}>
                  Show detail user
                </Button>,
                <Button
                  key={"submit"}
                  onClick={() => {
                    approveReport({ id: report?.id }).then(() => {
                      setIsModalOpen(false);
                    });
                  }}
                >
                  Approve
                </Button>,
              ]
            : [
                <Button key={""} onClick={() => showDrawer()}>
                  Show detail user
                </Button>,
              ]
        }
        width={1000}
        bodyStyle={{ overflowY: "scroll", height: "600px" }}
        style={{ overflow: "hidden", top: 50 }}
      >
        <div
          className=" "
          dangerouslySetInnerHTML={{
            __html: commentDetail?.data?.commentContent,
          }}
        ></div>
        <Drawer
          placement="right"
          closable={false}
          onClose={onClose}
          open={open}
          getContainer={false}
        >
          <div className=" h-full flex flex-col gap-1 ">
            <div className=" flex flex-col gap-1">
              <p className=" text-light_surface_on_surface font-medium mb-1 border-b border-b-black border-solid">
                User info
              </p>
              <div className="">
                <Avatar src={commentDetail?.data?.owner?.avatar} size={60} />
              </div>
              <p className=" text-light_surface_on_surface opacity-60">
                Fullname:{" "}
                <span className="text-light_surface_on_surface ">
                  {commentDetail?.data?.owner?.fullName}
                </span>
              </p>
            </div>
            <div className=" flex flex-col gap-1">
              <p className="text-light_surface_on_surface font-medium mb-1 border-b border-b-black border-solid">
                Reasons
              </p>
              <p className="text-light_surface_on_surface">{report?.content}</p>
            </div>
          </div>
        </Drawer>
      </Modal> */}
    </div>
  );
};

export default ReportCommentContent;
