import React, {useState} from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import HomeMaster from "./pages/home/HomeMaster";
import {AuthContext} from "./contexts/Auth"


function Router() {
  const [user, setUser] = useState(null);
  const login = (email, password) => {
    console.log('login', { email, password});
    setUser({id: '123', email});
  }
  const logout = () => {
    console.log('logout')
  }
  return (
    <AuthContext.Provider value={{authenticated: !!user, user, login}}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeMaster />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default Router;
