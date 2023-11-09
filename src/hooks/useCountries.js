import { useEffect, useState } from "react";
import https from "../services/https";

export function useCountries() {
   const [countries, setCountries] = useState([]);

   useEffect(() => {
      async function fetchCountries() {
         try {
            const { data } = await https.get('/countries');
            const array = data.map(item => ({
               value: item.num_code,
               label: item.nationality
            }));
            setCountries(array);
         } catch (error) {
            console.error(error);
         }
      }
      fetchCountries();
   }, []);

   return countries;
}