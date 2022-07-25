import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import Login from "./components/Login";
import { AppProvider } from "./contexts";

const App = () => (
  <BrowserRouter>
    <Login />
  </BrowserRouter>
);
export default App;
