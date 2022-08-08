import React, {useContext}from "react";
import { AuthContext } from "../../contexts/Auth";
import HeaderMenu from "../../components/Header/header"
import Content from "../../components/Content/Content";

export default function HomeMaster() {
    const {authenticated, logout} =useContext(AuthContext);
    const handleLogout = () => {
        logout();
    }
    return (
        <>
        <HeaderMenu/>
        <Content>
  
            <h1>Home Page</h1>
            <p>
                {String(authenticated)}
            </p>
                <button onClick={handleLogout} >
                    Logout
                </button>

                <ul>
                </ul>
        
        </Content>
        </>

    );
}

