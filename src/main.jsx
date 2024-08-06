import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import store from "./store/index.js";
import { Provider } from "react-redux";
import Modal from "./assets/components/Modals/Modal.jsx";
import LoginModal from "./assets/components/Modals/LoginModal.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  </React.StrictMode>
);
