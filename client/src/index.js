import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/_Index/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";



ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

/**
 * Renderiza cada vez que se hace un cambio en un
 * archivo sin necesidad de volver a correr la app
 */
if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
