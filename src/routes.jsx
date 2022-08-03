import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import HomeMaster from "./pages/home/HomeMaster";



function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomeMaster />} />
    </Routes>
  );
}

export default Router;
