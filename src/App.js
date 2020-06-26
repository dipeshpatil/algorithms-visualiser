import React from "react";
import "./App.css";

import "./utils/bootstrap.min.css";

import MainRouter from "./mainRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <MainRouter />
        </BrowserRouter>
    );
}

export default App;
