import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from './serviceWorker'; 
import { HashRouter as Router } from "react-router-dom";
import "./index.scss";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
serviceWorker.register();
