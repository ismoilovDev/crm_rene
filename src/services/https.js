import axios from "axios";

const https = axios.create({
   baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
   withCredentials: true,
   headers: {
      'Accept': 'application/json;charset=utf-8',
      'Authorization': "Bearer " + window.localStorage.getItem('token'),
   }
})

https.interceptors.response.use(
   response => response,
   error => {
      if (error.response && error.response.status === 401) {
         window.localStorage.clear();
         console.log(window.location.pathname)
         if (window.location.pathname !== "/login") {
            window.location.pathname = "/login";
         }
      }
      return Promise.reject(error);
   }
);

export default https;