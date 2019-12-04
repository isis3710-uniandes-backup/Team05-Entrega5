import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/_Index/App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter as Router } from "react-router-dom";
import { IntlProvider, createIntlCache } from "react-intl";
import txt from "./locales/txt";

const cache = createIntlCache();
let locale =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  "en-US";
// locale = "es-ES"; /** Español */

ReactDOM.render(
  <IntlProvider
    locale={locale}
    key={locale}
    value={cache}
    messages={txt[locale]}
  >
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
serviceWorker.register();
