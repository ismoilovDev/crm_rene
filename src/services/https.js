import axios from "axios";

const https = axios.create({
   baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
   withCredentials: true,
   headers: {
      'Accept': 'application/json;charset=utf-8',
      'Authorization': "Bearer " + localStorage.getItem('token')
   }
})

https.interceptors.response.use(
   response => response,
   error => {
      if (error.response && error.response.status === 401) {
         localStorage.clear();
      }
      return Promise.reject(error);
   }
);

export default https;