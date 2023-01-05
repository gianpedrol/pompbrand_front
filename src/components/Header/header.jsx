import React, { useContext, useState, useEffect } from "react";
import { getUserInfo } from "../../services/api";
import { Link } from "react-router-dom";
import {
    Flex,
    Spacer,
    Box,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
} from '@chakra-ui/react';
import { HiMenuAlt3 } from "react-icons/hi";
import { FaUserAlt, FaList } from "react-icons/fa";
import { AuthContext } from "../../contexts/Auth";
import Logo from '../../images/logo-sidebar.png';
import { formatDate, formatHour } from "../../helpers";
import './header.scss';


const Header = () => {
    const [userID, setUserID] = useState();
    const [user, setUser] = useState();
    const today = formatDate(new Date(), "extense");
    const [roleID, setRoleID] = useState();
    const [currentHour] = useState(formatHour(new Date()));
    const [sidebar, setSidebar] = useState(true);
    const [ml, setMl] = useState('240px')
    const { logout } = useContext(AuthContext);



    async function getUser() {
        const userLocal = localStorage.getItem('user');

        const userId = JSON.parse(userLocal).id;


        try {
            const user = await getUserInfo(userId);

            setUserID(user.data?.data);
            setUser(user.data?.data)
            setRoleID(user.data?.data.role_id);


        } catch (error) {
            //  console.log(error);
        }

    }

    useEffect(() => {
        getUser();
    }, []);

    const handleLogout = () => {
        logout();
    }

    const handleSidebar = () => {
        if (sidebar === true) {
            setSidebar(false)
            let sidebar = document.getElementById('sidebar');
            sidebar.style.display = 'none';
            setMl('40px');
        } else {
            setSidebar(true)
            let sidebar = document.getElementById('sidebar');
            sidebar.style.display = 'block';
            setMl('240px');
        }
    }

    return (
        <>
            <div className="header">
                <Flex>

                    <Box ml={ml} alignSelf='center'>
                        {roleID == 1 ?
                            <HiMenuAlt3 className="menu-icon " onClick={handleSidebar} />

                            : ''
                        }
                    </Box>


                    <Spacer />
                    <Box p='4'>
                        {roleID == 2 ?
                            <Menu>
                                <Link to={`/home/${userID?.id}`}>
                                    <MenuButton gap='2' as={Button} bg='#1A25FF' mr='20px' >
                                        Home
                                    </MenuButton>
                                </Link>
                            </Menu>
                            : ''

                        }


                        <Menu>
                            <MenuButton gap='2' as={Button} bg='#1A25FF' mr='20px' color={'white'} >
                                Conta
                            </MenuButton>

                            <MenuList>

                                <MenuGroup title='Conta'>
                                    <Link to={`/conta/${userID?.id}`}>
                                        <MenuItem >Minha conta</MenuItem>
                                    </Link>
                                </MenuGroup>

                                <MenuDivider />

                                <MenuGroup title='Logout'>
                                    <MenuItem onClick={handleLogout}> Logout </MenuItem>
                                </MenuGroup>

                            </MenuList>

                        </Menu>

                    </Box>
                </Flex>

            </div>
            {roleID == 1 ?
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
                                    <Link to="/dashboard"><FaUserAlt /><span> Usuários</span></Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <Link to="/phases"><FaList /><span> Fases </span></Link>
                                </li>
                            </ul>
                            <div>

                                <div className="footer-sidebar">
                                    <div className="horas">
                                        <span className="horas-title">{currentHour}</span>
                                        <span className="data-title">{today}</span>
                                    </div>

                                    <button className="logout" onClick={handleLogout} >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
                : ''

            }




        </>
    )

}


export default Header;