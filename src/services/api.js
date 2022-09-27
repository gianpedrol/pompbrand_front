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

export const showPhase = async (phaseId) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/show/phase/${phaseId}`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

   return response;
    
};

export const editStageApi = async (id,data) => {
  const token = localStorage.getItem("token");
  const response = await api.put(`edit/stage/${id}`,data,{
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type' : 'application/json;charset=utf-8'
    }
  });

 return response;
    
};

export const editPhaseApi = async (id,data) => {
  const token = localStorage.getItem("token");
  const response = await api.put(`edit/phase/${id}`,data,{
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type' : 'application/json;charset=utf-8'
    }
  });

  

 return response;
    
};

export const createNewStageApi = async (data) => {
  const token = localStorage.getItem("token");
  const response = await api.post('create/stage',data,{
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type' : 'application/json;charset=utf-8'
    }
  });

 return response;
    
};

export const deleteStageApi = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`delete/stage/${id}`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

 return response;
    
};

export const deletePhaseApi = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`delete/phase/${id}`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

 return response;
    
};

export const createNewPhaseApi = async (data) => {
  const token = localStorage.getItem("token");
  const response = await api.post('create/phase',data,{
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type' : 'application/json;charset=utf-8'
    }
  });

 return response;
    
};

export const getUserInfo = async (userId) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/show/user/${userId}`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

   return response;
    
};

export const updateStageStatus = async (data) => {
  const token = localStorage.getItem("token");
  const response = await api.post(`update/stage/user`,data,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
   return response;    
};

export const createNewUserApi = async (data) => {
  const token = localStorage.getItem("token");
  const response = await api.post('create/user',data,{
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type' : 'application/json;charset=utf-8'
    }
  });

 return response;
    
};

export const deleteUserApi = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`delete/user/${id}`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

 return response;
    
};

export const updateUserApi = async (id,data) => {
  const token = localStorage.getItem("token");
  const response = await api.put(`update/user/${id}`,data,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
   return response;    
};


export default api;
