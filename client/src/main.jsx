import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import store from "./store/store";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
          <Toaster />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
