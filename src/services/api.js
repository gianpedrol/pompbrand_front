import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/pompbrand-api/public/api"
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
//  alert(token);
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  return config;
});

export const getUsers = async (e) => {
  const token = localStorage.getItem("token");
    const response = await api.get('/list/users',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

   return response;
    
};

export const getPhases = async (e) => {
  const token = localStorage.getItem("token");
    const response = await api.get('/list/phase',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

   return response;
    
};

export default api;
