import { Button, Form, Modal, Pagination, Spin } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PostItem from "./PostItem";
import { useQuery } from "@tanstack/react-query";
import { getListPostApi } from "../../api/post";
import usePostMutate from "../../hooks/useMutate/usePostMutate";

const PostsContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultPage = parseInt(searchParams.get("page")) - 1 || 0;
  const [page, setPage] = useState(defaultPage);
  const [postId, setPostId] = useState(null);
  // const {
  //   getListPost,
  //   listPost,
  //   getListSuccess,
  //   getListLoading,
  //   approvePost,
  //   rejectPost,
  //   loadingApprove,
  //   loadingReject,
  // } = UsePost(0, 3, page);
  const { approvePost, rejectPost } = usePostMutate();
  const {
    data: listPost,
    refetch: getListPost,
    isSuccess: getListSuccess,
    isLoading: getListLoading,
  } = useQuery({
    queryKey: ["listPost"],
    queryFn: () => getListPostApi(0, 3, page),
    enabled: true,
    retry: 0,
    onSuccess: (listPost) => {
      // dispatch(setListPost(listPost.data));
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const showModal = (content, postId) => {
    setContent(content);
    setPostId(postId);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handlePagination2 = async (page) => {
    setPage(page);
  };
  // const handleConvertData = (rawdata) => {
  //   var data = [];
  //   if (rawdata) {
  //     rawdata.map((item) => {
  //       data.push({
  //         key: item.id,
  //         expertId: item.owner.id,
  //         expertName: item.owner.fullName,
  //         avatar: item.owner.avatar,
  //         postId: item.id,
  //         content: item.content,
  //         createdDate: item.createdDate,
  //         status: item.status,
  //       });
  //     });
  //   }

  //   return data;
  // };

  // const newdata = getListSuccess
  //   ? handleConvertData(listPost.data.content)
  //   : [];
  // const columns = [
  //   {
  //     title: "Avatar",
  //     dataIndex: "avatar",
  //     key: "avatar",
  //     align: "center",
  //     render: (_, record) => <Avatar src={record.avatar} />,
  //   },
  //   {
  //     title: "Expert name",
  //     dataIndex: "expertName",
  //     key: "expertName",
  //     align: "center",
  //   },
  //   {
  //     title: "Post ID",
  //     dataIndex: "postId",
  //     key: "postId",
  //     align: "center",
  //   },
  //   {
  //     title: "Created date",
  //     dataIndex: "createdDate",
  //     key: "createdDate",
  //     align: "center",
  //     render: (_, record) => {
  //       const rawtime = dayjs(record.createdDate, "DD/MM/YYYY");
  //       const formatTime = dayjs(rawtime["$d"]).format("DD/MM/YYYY");
  //       return <p>{formatTime}</p>;
  //     },
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     align: "center",
  //     width: 100,
  //     render: (_, record) => {
  //       var color = "green";
  //       var status = "availabel";
  //       if (record.status === 0) {
  //         color = "yellow";
  //         status = "pending";
  //       }
  //       return (
  //         <div
  //           className={`bg-${color}-500 p-[1px] text-center rounded-[5px] text-[14px]`}
  //         >
  //           {status}
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "action",
  //     key: "action",

  //     align: "center",
  //     render: (_, record) => {
  //       var check = false;
  //       if (record.status === 0) {
  //         check = true;
  //       }
  //       return (
  //         <div className="flex flex-row gap-2 items-center justify-center">
  //           <EyeOutlined
  //             style={{ fontSize: "20px" }}
  //             className=" cursor-pointer hover:text-blue-400"
  //             onClick={() => {
  //               showModal(record.content);
  //             }}
  //           />
  //           {check && (
  //             <div className="flex flex-row gap-2">
  //               <Popconfirm
  //                 title="Approve this post?"
  //                 description="Are you sure to approve this post?"
  //                 onConfirm={() => {
  //                   handleApprove(record.postId);
  //                 }}
  //                 onCancel={cancel}
  //                 okText="Yes"
  //                 cancelText="No"
  //                 okType="default"
  //                 okButtonProps={{ loading: loadingApprove }}
  //               >
  //                 <CheckOutlined
  //                   style={{ color: "green", fontSize: "20px" }}
  //                   className=" cursor-pointer hover:opacity-60"
  //                   // onClick={() => {
  //                   //   approvePost({ id: record.postId });
  //                   // }}
  //                 />
  //               </Popconfirm>
  //               <Popconfirm
  //                 title="Reject this post?"
  //                 description="Are you sure to Reject this post?"
  //                 onConfirm={() => {
  //                   handleReject(record.postId);
  //                 }}
  //                 onCancel={cancel}
  //                 okText="Yes"
  //                 cancelText="No"
  //                 okType="default"
  //                 okButtonProps={{ loading: loadingReject }}
  //               >
  //                 <CloseOutlined
  //                   style={{ color: "red", fontSize: "20px" }}
  //                   className=" cursor-pointer hover:opacity-60"
  //                   // onClick={() => {
  //                   //   rejectPost({ id: record.postId });
  //                   // }}
  //                 />
  //               </Popconfirm>
  //             </div>
  //           )}
  //         </div>
  //       );
  //     },
  //   },
  // ];
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: "white",
      }}
      className=" flex flex-col"
    >
      <div
        className=" border-b-black border-b-[1px] border-b-solid"
        onClick={() => setIsModalOpen(true)}
      >
        <Form>
          <Form.Item label="Title"></Form.Item>
        </Form>
      </div>
      <div className=" flex flex-col gap-2 mt-2">
        {!getListLoading ? (
          listPost?.data?.content.map((item) => {
            return (
              <div
                className=""
                key={item.id}
                onClick={() => showModal(item.content, item.id)}
              >
                <PostItem
                  content={item.content}
                  avt={item.owner.avatar}
                  fullname={item.owner.fullName}
                  idpost={item.id}
                />
              </div>
            );
          })
        ) : (
          <Spin />
        )}
        {/* <Table
          columns={columns}
          dataSource={newdata}
          loading={getListLoading}
          pagination={{
            defaultCurrent: defaultPage + 1,
            pageSize: 5,
            total: listPost?.data?.totalElements,
            onChange: async (page) => {
              await handlePagination2(page - 1);
              await getListPost(0, 5, page - 1);
              setSearchParams({ page: page });
            },
          }}
        ></Table> */}
      </div>
      <div className=" flex flex-row justify-end mt-3">
        <Pagination
          defaultCurrent={defaultPage + 1}
          total={listPost?.data?.totalElements}
          pageSize={3}
          onChange={async (page) => {
            await handlePagination2(page - 1);
            await getListPost(0, 5, page - 1);
            setSearchParams({ page: page });
          }}
        />
      </div>

      <Modal
        title="Post detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 50 }}
        footer={[
          <Button
            key="back"
            danger
            onClick={() =>
              rejectPost({ id: postId }).then(() => {
                setIsModalOpen(false);
              })
            }
          >
            Reject
          </Button>,
          <Button
            key="submit"
            type="default"
            onClick={() =>
              approvePost({ id: postId }).then(() => {
                setIsModalOpen(false);
              })
            }
          >
            Approve
          </Button>,
        ]}
        width={1000}
        bodyStyle={{ overflowY: "scroll", height: "600px" }}
      >
        <div className=" " dangerouslySetInnerHTML={{ __html: content }}></div>
      </Modal>
    </div>
  );
};

export default PostsContent;
