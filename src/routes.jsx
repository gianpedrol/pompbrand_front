import React, {useContext} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import HomeMaster from "./pages/home/HomeMaster";
import { AuthProvider, AuthContext } from './contexts/Auth'
import ListPhases from "./pages/phases/ListPhases";
import ShowPhase from "./pages/phases/ShowPhase";
import ShowUser from "./pages/users/ShowUser";
import MyAccount from "./pages/conta/MinhaConta";
import HomeUser from "./pages/home/HomeUser";


function Router() {

  const Private = ({children}) => {
    const {user,authenticated } = useContext(AuthContext);
     const token = localStorage.getItem('token');

    if(token === null || user === false){
        return <Navigate to="/"/>
    }

    return children;
}
  return (
        <AuthProvider>
        <Routes>
              <Route exact path='/' element={<Login />}/>
                <Route path='/dashboard' element={
                        <Private>
                            <HomeMaster />
                        </Private>
                    } />
                    <Route path='/home/:id' element={
                        <Private>
                            <HomeUser />
                        </Private>
                    } />
                    <Route path='/phases' element={
                        <Private>
                            <ListPhases />
                        </Private>
                    } />
                    <Route path='/phase/:id' element={
                        <Private>
                            <ShowPhase />
                        </Private>
                    } />
                <Route path='/user/:id' element={
                        <Private>
                            <ShowUser />
                        </Private>
                    } />
                    <Route path='/conta/:id' element={
                        <Private>
                            <MyAccount />
                        </Private>
                    } />
         </Routes>
      </AuthProvider>
   
    )
}

export default Router;
