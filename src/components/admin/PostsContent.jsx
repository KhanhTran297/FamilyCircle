import { Button, Form, Modal, Pagination, Select, Spin } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PostItem from "./PostItem";
import { useQuery } from "@tanstack/react-query";
import { getListPostNewApi } from "../../api/post";
import usePostMutate from "../../hooks/useMutate/usePostMutate";
import { getListCategoryApi } from "../../api/category";

const roleOptions = [
  { label: "Expert", value: 1 },
  { label: "User", value: 2 },
];
const PostsContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [communityId, setCommunityId] = useState(null);
  const [role, setRole] = useState(null);
  const [title, setTitle] = useState(null);
  const defaultPage = parseInt(searchParams.get("page")) - 1 || 0;
  const [page, setPage] = useState(defaultPage);
  const [postId, setPostId] = useState(null);
  const { approvePost, rejectPost } = usePostMutate();
  const { data: listPost, isLoading } = useQuery({
    queryKey: ["listPost", page, communityId, role],
    queryFn: () =>
      getListPostNewApi({
        status: 0,
        size: 3,
        page: page,
        ...(communityId && { communityId: communityId }),
        // communityId: communityId || undefined,
        kind: role,
      }),
  });
  const { data: listCommunity } = useQuery({
    queryKey: ["listCommunity"],
    queryFn: () =>
      getListCategoryApi({ kind: 5 }).then((res) => {
        const newData = res?.data?.content?.map((item) => {
          return {
            label: item.categoryName,
            value: item.id,
          };
        });
        return newData;
      }),
  });
  const handleClear = () => {
    setCommunityId(null);
    setPage(0);
  };
  const onChange = (value, item) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      community: item?.label,
    }));
    setPage(0);
    setCommunityId(value);
  };
  const onChangeRole = (value, item) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      role: item?.label,
    }));
    setPage(0);
    setRole(value);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const showModal = (content, postId, title) => {
    setTitle(title);
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

  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: "white",
      }}
      className="flex flex-col "
    >
      <div
        className=" border-b-black border-b-[1px] border-b-solid "
        // onClick={() => setIsModalOpen(true)}
      >
        <Form className=" flex flex-row gap-2">
          <Form.Item label="Community">
            <Select
              options={listCommunity}
              showSearch
              placeholder="Select a community"
              optionFilterProp="children"
              onSearch={onSearch}
              onChange={onChange}
              filterOption={filterOption}
              allowClear
              onClear={() => handleClear()}
            ></Select>
          </Form.Item>
          <Form.Item label="Role">
            <Select
              options={roleOptions}
              showSearch
              placeholder="Select a role"
              optionFilterProp="children"
              onSearch={onSearch}
              onChange={onChangeRole}
              filterOption={filterOption}
              allowClear
              onClear={() => handleClear()}
            ></Select>
          </Form.Item>
        </Form>
      </div>
      <div className="flex flex-col overflow-y-scroll h-[500px]">
        <div className="flex flex-col gap-2 mt-2 ">
          {!isLoading ? (
            listPost?.data?.content?.map((item) => {
              return (
                <div
                  className=""
                  key={item.id}
                  onClick={() => showModal(item.content, item.id, item.title)}
                >
                  <PostItem item={item} />
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
        <div className="flex flex-row justify-end mt-3 ">
          <Pagination
            current={defaultPage + 1}
            defaultCurrent={1}
            total={listPost?.data?.totalElements}
            pageSize={3}
            onChange={async (page) => {
              await handlePagination2(page - 1);
              // await fetchNextPage();

              setSearchParams({ page: page });
            }}
          />
        </div>
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
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <p className=" font-roboto text-lg">Title:</p>
            <p className=" font-roboto font-medium text-lg">{title}</p>
          </div>
          <div className="" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </Modal>
    </div>
  );
};

export default PostsContent;
