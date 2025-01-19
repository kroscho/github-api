import React from "react";
import ReactDOM from "react-dom/client";
import AppTeam from "./AppTeam";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root-team") as HTMLElement).render(
  <React.StrictMode>
    <AppTeam />
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
