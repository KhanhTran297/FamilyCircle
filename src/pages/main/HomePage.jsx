// import { useNavigate } from "react-router-dom";
// import UseCookie from "../../hooks/UseCookie";
// import Home from "../../components/home/Home";
// import LeftSideBar from "../../components/leftsidebar/LeftSideBar";
// import RightSiderBar from "../../components/rightsiderbar/RightSiderBar";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Tab from "../../components/tab/Tab";
import SearchPage from "./SearchPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParamsRedux } from "../../redux/slice/search";

const HomePage = () => {
  // const { removeToken } = UseCookie();
  // const handleLogout = () => {
  //   removeToken();
  //   navigate("/");
  // };
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const selector = useSelector((state) => state.search);
  const searchParamsState = selector.searchParams;
  console.log("searchParamsState", searchParamsState?.search);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("search");
    console.log("searchValue", JSON.stringify(searchValue));
    dispatch(setSearchParamsRedux({ search: searchValue }));
  }, [location.search]);
  return (
    // <div className="flex xl:w-full xl:justify-center dark:bg-[#000]">
    //   <div className="flex flex-col w-full gap-0 xl:gap-10 xl:flex-row xl:w-auto">
    //     <LeftSideBar />
    //     <Home kind={1} />
    //     <RightSiderBar />
    //   </div>
    // </div>
    <div className="flex justify-center w-full">
      <div className="flex self-stretch justify-center w-full desktop:w-[760px]">
        {searchParamsState?.search ? (
          <SearchPage searchParams={searchParamsState?.search} />
        ) : (
          <Tab kind={1} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
