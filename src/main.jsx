import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { store } from "./_helpers";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
