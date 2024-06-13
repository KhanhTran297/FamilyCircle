import { Outlet } from "react-router";
import LeftSideBar from "../components/leftsidebar/LeftSideBar";
import RightSiderBar from "../components/rightsiderbar/RightSiderBar";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { getToken, onMessage } from "firebase/messaging";
import { message } from "antd";
import { auth, database, messaging } from "../notifications/firebase";
import { useGetFetchQuery } from "../hooks/useGetFetchQuery";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { setSearchParamsRedux } from "../redux/slice/search";
import SearchPage from "../pages/main/SearchPage";
import { onAuthStateChanged } from "firebase/auth";
const MainLayout = () => {
  const location = useLocation();
  const params = useParams();
  const userId = JSON.parse(localStorage.getItem("userId"));

  const accountProfile = useGetFetchQuery(["accountProfile"]);
  const checkPage = (path) => {
    if (
      path === "/message" ||
      path === "/community" ||
      path === "/babyhealth" ||
      path === "/motherhealth" ||
      params.communityName !== undefined
    ) {
      return true;
    }
    return false;
  };
  const dispatch = useDispatch();

  const selector = useSelector((state) => state.search);
  const searchParamsState = selector.searchParams;
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchValue = searchParams.get("search");
    dispatch(setSearchParamsRedux({ search: searchValue }));
  }, [location.search]);

  useEffect(() => {
    // requestPermission()
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          getToken(messaging, {
            vapidKey:
              "BH-nLv3uT1gIDu--kjFf-Gd1u7yaZJlyS4FrrYq9QRSlK5R00Dh9WUH0iVSIKK1gGqgu4gBIUcdD2RmpGy_pgHc",
          }).then((currentToken) => {
            // console.log("uid", auth?.currentUser?.uid);
            // onAuthStateChanged(auth, (user) => {
            //   if (user && accountProfile) {
            //     set(ref(database, "users/" + userId), {
            //       id: userId,
            //       token: currentToken,
            //     });
            //   }
            // });
            // console.log("FCM Token", currentToken);
            // console.log(accountProfile?.data?.id);
            console.log("uid", userId);
            set(ref(database, "users/" + accountProfile?.data?.id), {
              id: accountProfile?.data?.id,
              token: currentToken,
            });
          });
        }
      })
      .finally(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${accountProfile?.data?.id}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log("snapshot", snapshot.val());
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
    // onMessage(messaging, (payload) => {
    //   console.log("Message received. ", payload);
    //   message.success(payload.notification.body);
    // });
  }, []);
  return (
    // <div className=" w-full dark:bg-[#000]">
    //   <div className="flex flex-col self-stretch w-full xl:gap-10 xl:flex-row xl:w-auto ">
    //     <LeftSideBar />
    //     <div className="flex-grow">
    //       <Outlet />
    //     </div>
    //     {checkPage(location.pathname) ? "" : <RightSiderBar />}
    //   </div>
    // </div>

    <div className=" w-full dark:bg-[#000]">
      <div
        className={`flex flex-col self-stretch  w-full xl:gap-10 xl:grid xl:grid-flow-col ${
          checkPage(location.pathname)
            ? "xl:grid-cols-[calc(25%-40px)_75%]"
            : "xl:grid-cols-[calc(25%-40px)_50%_calc(25%-40px)]"
        } `}
      >
        <LeftSideBar />

        <div className="flex-grow ">
          {searchParamsState?.search ? (
            <SearchPage searchParams={searchParamsState?.search} />
          ) : (
            <Outlet />
          )}
        </div>

        {checkPage(location.pathname) ? "" : <RightSiderBar />}
      </div>
    </div>
  );
};

export default MainLayout;
