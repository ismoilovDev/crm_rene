import { useQuery } from 'react-query';
import https from '../services/https';

function fetchApiData(endpoint) {
   return https.get(`${endpoint}`).then((response) => response.data);
}

function useFetch(endpoint, casheTime = 60000, options = {}) {
   return useQuery(endpoint, () => fetchApiData(endpoint), {
      staleTime: casheTime,
      ...options,
   });
}

export default useFetch;
