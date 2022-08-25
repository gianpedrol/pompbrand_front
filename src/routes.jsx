import React, {useContext} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import HomeMaster from "./pages/home/HomeMaster";
import { AuthProvider, AuthContext } from './contexts/Auth'
import ListPhases from "./pages/phases/ListPhases";


function Router() {

  const Private = ({children}) => {
    const {user} = useContext(AuthContext);
     const token = localStorage.getItem('token');

    if(token === null || user === false){
        return <Navigate to="/login "/>
    }
    return children;
}
  return (
        <AuthProvider>
        <Routes>
          <Route exact path='/login' element={<Login />}/>
          <Route path='/' element={
                  <Private>
                      <HomeMaster />
                  </Private>
              } />
              <Route path='/phases' element={
                  <Private>
                      <ListPhases />
                  </Private>
              } />
         </Routes>
      </AuthProvider>
   
    );
}

export default Router;
