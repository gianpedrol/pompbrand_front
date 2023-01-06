import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost/pompbrand_api/public/api"
  //baseURL: "https://pomp-brand-api.gianfrancopedrol.com.br/public/api"
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
//  alert(token);
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Access-Control-Allow-Origin"] = "*";
  return config;
});

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error?.response?.status === 401) {
      // window.location.pathname = "/";
    }

    return Promise.reject(error);
  },
);

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

export const forgotPasswordApi = async (data) => {
  const response = await api.post('password/forgot',data);
  return response;    
};

export const resetPasswordApi = async (data) => {
  const response = await api.post('password/reset',data);
  return response;    
};

export const getDocsUserApi = async (userId) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/doc/user/${userId}`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

   return response;
    
};

export const uploadUserDocApi = async (data) => {
  const token = localStorage.getItem("token");
  const response = await api.post(`/upload/user/doc`, data,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response;
};

export const deleteDocumentApi = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`delete/doc/${id}`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

 return response;
    
};

export const getFinanceUserApi = async (userId) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/finance/user/${userId}`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

   return response;
    
};

export const uploadUserFinanceApi = async (data) => {
  const token = localStorage.getItem("token");
  const response = await api.post(`/upload/user/finance`, data,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response;
};

export const deleteFinanceApi = async (id) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`delete/finance/${id}`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

 return response;
    
};

export default api;
