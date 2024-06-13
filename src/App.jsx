import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  return (
    <div className="">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </div>
  );
}

export default App;
