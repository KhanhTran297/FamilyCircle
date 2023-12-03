import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import store from "./redux/store/store";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="988889415719-oogj3aqv6nlpdaj1mpn9sb0rjvtlakco.apps.googleusercontent.com">
        <RecoilRoot>
          <App />
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </Provider>
  // <React.StrictMode>
  //   <RecoilRoot>
  //     <App />
  //   </RecoilRoot>
  // </React.StrictMode>
);
