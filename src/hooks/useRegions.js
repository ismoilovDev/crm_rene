import { useEffect, useState } from "react";
import https from "../services/https";

export function useRegions() {
   const [regions, setRegions] = useState([]);

   useEffect(() => {
      async function fetchRegions() {
         try {
            const { data } = await https.get('/regions');
            const array = data.map(item => ({
               value: item.id,
               label: item.name_uz
            }));
            setRegions(array);
         } catch (error) {
            console.error(error);
         }
      }
      fetchRegions();
   }, []);

   return regions;
}