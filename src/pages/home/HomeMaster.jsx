import React, {useContext}from "react";
import { AuthContext } from "../../contexts/Auth";
import { api } from "../../services/api";

export default function HomeMaster() {
    const {authenticated, logout} =useContext(AuthContext);
    const handleLogout = () => {
        logout();
    }
    return (
        <>
        <h1>Home Page</h1>
        <p>
            {String(authenticated)}
        </p>
            <button onClick={handleLogout} >
                Logout
            </button>

            <ul>
            </ul>
        </>
    );
}

