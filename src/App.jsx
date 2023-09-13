import { RouterProvider } from "react-router-dom";
import router from "./routers/router";

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
