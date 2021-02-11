import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";
import '@google/model-viewer/dist/model-viewer.js';
require(`dotenv`).config();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  ,
  document.getElementById(`root`)
)
serviceWorker.register();
