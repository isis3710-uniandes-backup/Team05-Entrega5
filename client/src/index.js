import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { IntlProvider } from "react-intl";

import "./index.css";
import App from "./App/_Index/App";
import * as serviceWorker from "./serviceWorker";
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

let getlocales = () => {
	let navLanguage = navigator.language || navigator.userLanguage;
	let locales = localeEnMessages;
	if(navLanguage.includes('es')) {
		locales = localeEsMessages;
	}
	return locales;
};

ReactDOM.render(
  <IntlProvider locale={navigator.language} messages={getlocales()}>
    <Router>
      <App />
    </Router>
  </IntlProvider>, 
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
