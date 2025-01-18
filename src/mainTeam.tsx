import React from "react";
import ReactDOM from "react-dom/client";
import AppTeam from "./AppTeam";

import "./index.css";

import "./demos/ipc";
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

ReactDOM.createRoot(document.getElementById("root-team") as HTMLElement).render(
  <React.StrictMode>
    <AppTeam />
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
