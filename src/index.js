import "core-js/stable";
import "regenerator-runtime/runtime";
import "isomorphic-fetch";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { GlobalStateProvider } from "Context/index";
import { mainReducer } from "Reducers";
import { initialState } from "./store/initialState";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.less";
import "./input.css";
import axios from "axios";

import "video-react/dist/video-react.css";

axios.defaults.baseURL = "https://api.fatehacademy.com/api";
// axios.defaults.baseURL = " http://localhost:5001/api";

// axios.defaults.baseURL = "http://localhost:5000/api";

ReactDOM.render(
  <GlobalStateProvider initialState={initialState} reducer={mainReducer}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalStateProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
