import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

// UI only for now. When you add the Redux / RTK Query layer, import the store
// and wrap <App /> in <Provider store={store}> here.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
