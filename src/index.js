import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";

import { library } from '@fortawesome/fontawesome-svg-core'
import * as Icons from '@fortawesome/free-solid-svg-icons';
const iconList = Object
    .keys(Icons)
    .filter(key => key !== "fas" && key !== "prefix" )
    .map(icon => Icons[icon])
library.add(...iconList)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App/>
);

