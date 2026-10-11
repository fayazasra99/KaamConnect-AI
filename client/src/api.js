import axios from 'axios';
const api=axios.create({baseURL:import.meta.env.VITE_API_URL||'http://localhost:5000/api'});
api.interceptors.request.use(config=>{const token=localStorage.getItem('kc-token');if(token)config.headers.Authorization=`Bearer ${token}`;return config;});
api.interceptors.response.use(r=>r.data.data,(error)=>Promise.reject(new Error(error.response?.data?.error?.message||'Could not reach the KaamConnect API. Check the server and try again.')));
export default api;
