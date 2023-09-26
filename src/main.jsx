import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </Provider>
  // <React.StrictMode>
  //   <RecoilRoot>
  //     <App />
  //   </RecoilRoot>
  // </React.StrictMode>
);
