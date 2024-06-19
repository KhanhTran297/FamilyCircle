import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAccountClientApi } from "../../api/account";
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const SearchingUsers = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState("");
  const {
    data: listSearchingUsers,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["searchingUsers"],
    queryFn: () =>
      getAccountClientApi({ fullName: searchParams }).then((res) => {
        const tempdata = res?.data?.content?.map((item) => {
          return {
            value: item.id,
            label: (
              <div className="flex flex-row items-center gap-2">
                <div className="w-10 h-10 rounded-full ">
                  <img
                    src={item?.avatar}
                    alt=""
                    className="object-scale-down w-full h-full rounded-full "
                  />
                </div>
                <div className="">
                  <p className="text-sm font-normal font-roboto">
                    {item?.fullName}
                  </p>
                </div>
              </div>
            ),
          };
        });
        return tempdata || [];
      }),
    enabled: false,
  });

  const handleSearch = (newValue) => {
    // fetch(newValue, setData);
    setTimeout(async () => {
      setSearchParams(newValue);
      await refetch();
    }, 1000);
  };

  useEffect(() => {
    refetch();
  }, [searchParams]);
  return (
    <div className=" w-max">
      <Select
        allowClear
        className="w-[250px] "
        showSearch
        value={null}
        // value={value}
        placeholder={"Search users"}
        defaultActiveFirstOption={true}
        suffixIcon={<SearchOutlined />}
        filterOption={false}
        onSelect={(value) => {
          navigate(`/profile/${value}`);
          setSearchParams("");
        }}
        onSearch={handleSearch}
        // onChange={handleChange}
        notFoundContent={<div>Not found</div>}
        loading={isLoading}
        options={listSearchingUsers}
      ></Select>
    </div>
  );
};

SearchingUsers.propTypes = {};

export default SearchingUsers;
