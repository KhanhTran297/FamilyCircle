import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useQuery } from "@tanstack/react-query";
import { getAccountClientApi } from "../../api/account";

import SearchList from "../../components/shared/SearchList";
import { getListPostNewApi } from "../../api/post";

const SearchPage = (props) => {
  const {
    data: listAccount,
    refetch: fetchAccount,
    isLoading: loadingAccount,
  } = useQuery({
    queryKey: ["searchAccount"],
    queryFn: () =>
      getAccountClientApi({ fullName: props.searchParams }).then((res) => {
        return res?.data;
      }),
    enabled: false,
  });
  const {
    data: listPost,
    refetch: fetchPost,
    isLoading: loadingPost,
  } = useQuery({
    queryKey: ["searchPost"],
    queryFn: () =>
      getListPostNewApi({ title: props.searchParams }).then((res) => res?.data),
    enabled: false,
  });

  useEffect(() => {
    fetchAccount();
    fetchPost();
  }, [props.searchParams]);

  return (
    <div className="flex flex-col w-full gap-2 pt-2 ">
      <div className="flex flex-row border-b border-[#ccc] py-2">
        <p className="text-xl font-medium font-roboto">Search:</p>
      </div>
      {/* <div className="flex flex-col gap-1 ">
        <div className="">
          <p className="text-base font-normal font-roboto">Account</p>
        </div>
        <div className="flex flex-col gap-2 ">
           
        </div>
      </div> */}
      {listAccount?.totalElements > 0 && (
        <SearchList
          listSearch={listAccount?.content}
          kind={1}
          loading={loadingAccount}
        />
      )}
      {listPost?.totalElements > 0 && (
        <SearchList
          listSearch={listPost?.content}
          kind={2}
          loading={loadingPost}
        />
      )}
    </div>
  );
};

SearchPage.propTypes = {
  searchParams: PropTypes.string,
};

export default SearchPage;
