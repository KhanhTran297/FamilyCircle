import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registration successful with scope: ",
          registration.scope
        );
      })
      .catch((err) => {
        console.log("Service Worker registration failed: ", err);
      });
  }
  return (
    <div className="">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </div>
  );
}

export default App;
