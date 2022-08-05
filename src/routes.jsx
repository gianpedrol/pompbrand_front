import React, {useContext} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import HomeMaster from "./pages/home/HomeMaster";
import { AuthProvider, AuthContext } from './contexts/Auth'
import { Spinner } from '@chakra-ui/react';


function Router() {

  const Private = ({children}) => {
    const {authenticated, loading} = useContext(AuthContext);
    if(loading){
        return (
          <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
          )
    }
    if(!authenticated){
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
         </Routes>
      </AuthProvider>
   
    );
}

export default Router;
