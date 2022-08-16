import React, {useContext}from "react";
import { Link } from "react-router-dom";
import { Box, 
    useDisclosure, 
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, } from '@chakra-ui/react';
import { AuthContext } from "../../contexts/Auth";
import Logo from '../../images/logo-sidebar.png'
import './sidebar.scss';
const Sidebar = () => {

    const {logout} =useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }
        return (
            <>
            <div className="sidebar">
            <Box>
                    <div>
                        <div className="logo">
                            <img src={Logo} alt="" srcset="" />
                        </div>
                        </div>
                        <div className="links">
                            <ul>
                                <li>
                                    <a href=""> Link </a>
                                </li>
                            </ul>
                        <button className="logout" onClick={handleLogout} >
                            Logout
                        </button>
                    </div>
                </Box>
            </div>
             
                        
              
            </>
        );
}

export default Sidebar;