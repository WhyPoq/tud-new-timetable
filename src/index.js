import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import moment from "moment";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

moment.locale("en-ie");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>
);

serviceWorkerRegistration.register();
