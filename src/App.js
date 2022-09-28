import React from "react";
import Router from "./Router/Router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./GlobalStyle";
import Responsive from "./Responsive";
import "./Static/Font/Fonts.css";

const queryClient = new QueryClient();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(reg => console.log("service worker registered", reg))
    .catch(err => console.log("service worker not registered", err));
}

function App() {
  return (
    <div className="Font">
      <GlobalStyle />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Responsive>
            <Router />
          </Responsive>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
