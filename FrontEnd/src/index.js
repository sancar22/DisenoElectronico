// Dependecies
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

// Components
import AppRoutes from "./config/routes";
import store from "./store";

// Styles
import "./index.scss";

render(
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>,
    document.getElementById("root")
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
