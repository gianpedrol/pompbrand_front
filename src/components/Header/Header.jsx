import React, {useContext, useState}from "react";
import { Link } from "react-router-dom";
import { 
    Flex, 
    Spacer,
    Center,
    Box, 
    Button,
    Menu,
    MenuButton, 
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
} from '@chakra-ui/react';
import { AuthContext } from "../../contexts/Auth";
import Logo from '../../images/logo-sidebar.png';
import './header.scss';


const Header = () => {
    const [sidebar, setSidebar] = useState(true);
    const [ml, setMl] = useState('240px')
    const {logout} =useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    const handleSidebar = () => {
        if(sidebar == true){
            setSidebar(false)
           let sidebar = document.getElementById('sidebar');
           sidebar.style.display = 'none';
           setMl('40px') ;
        }else{
            setSidebar(true)
            let sidebar = document.getElementById('sidebar');
            sidebar.style.display = 'block';
            setMl('240px');
        }
    }

    return(
        <>
        <div className="header">
        <Flex>
            <Box ml={ml} alignSelf='center'>
                <h1 onClick={handleSidebar}> Abrir Fechar Menu</h1>    
            </Box>
            <Spacer />
            <Box p='4'>
            <Menu>
                 <MenuButton gap='2' as={Button} bg='#B4FE5B' mr='20px' >
                    Conta
                </MenuButton>

                <MenuList>

                    <MenuGroup title='Conta'>
                    <MenuItem>Minha Conta</MenuItem>
                    </MenuGroup>

                    <MenuDivider />

                    <MenuGroup title='Logout'>
                    <MenuItem  onClick={handleLogout}> Logout </MenuItem>
                    </MenuGroup>

                </MenuList>

            </Menu>

            </Box>
        </Flex>
          
        </div>

        <div className="sidebar" id="sidebar">
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
    )

} 


export default Header;