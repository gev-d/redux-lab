import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";
import { store } from "./store/index";

import { Provider } from "react-redux";

// UI only for now. When you add the Redux / RTK Query layer, import the store
// and wrap <App /> in <Provider store={store}> here.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
