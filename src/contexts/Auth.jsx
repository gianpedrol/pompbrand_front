import { api } from "../services/api";
import { toast } from "react-toastify";
import React from "react";
export const GroupsContext = React.createContext({});

export function useAuth() {
  const Login = async (data) => {
    try {
      const response = await api.post("/login", data);
      if (response.status === 200) {
        localStorage.setItem("authToken", response?.data?.authToken);
        toast.success("Usuário logado");
      }
      return response;
    } catch (error) {
      toast.error("Usuário ou senha incorreta");
      return error;
    }
  };

  return { Login };
}
