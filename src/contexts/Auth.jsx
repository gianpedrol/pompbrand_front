import  api from "../services/api";
import axios from "axios";
import  {createContext, useEffect, useState} from "react";
import { useToast } from '@chakra-ui/react';
import {useNavigate } from "react-router-dom";


export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(()=> {
      const recoveredUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if(recoveredUser && token){
          setUser(JSON.parse(recoveredUser));
          api.defaults.headers.Authorization = `Bearer ${token}` 
      }

      setLoading(false);

  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/login", {email, password})
      console.log(response.data);

      const loggedUser = response.data.user;
      const token = response.data.token;

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", token);
            
      setUser(loggedUser);
      navigate("/");
      if (response.status === 200) {

        toast({
          title: 'Usuário Logado!',
          description: "Aproveite nosso sistema.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
      return response;
    } catch (error) {
      JSON.stringify(error)
      console.log(error.data)
      toast({
        title: 'Deu algo errado',
        status: 'error',
        isClosable: true,
      })
      return error;
    }
  }

  const logout = () => {
     console.log('logout');
     localStorage.removeItem('user');
     localStorage.removeItem('token');
     api.defaults.headers.Authorization = null 
     setUser(null);
     navigate("/login");

  }

  return(
      <AuthContext.Provider value={{authenticated: !!user, user,loading, login, logout }}>
          {children}
      </AuthContext.Provider>
  )
  }


