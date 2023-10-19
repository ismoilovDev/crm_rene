import { useState, useEffect } from 'react';
import https from '../services/https';

const useDataFetching = (url) => {
   const [data, setData] = useState();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const { data } = await https.post(url, {});
            setData(data);
         } catch (err) {
            console.log(err)
         }
      };

      fetchData();
   }, [url]);

   return { data };
};

export default useDataFetching;
