import { useEffect, useState } from "react";
import https from "../services/https";

export function useDistricts() {
   const [districts, setDistricts] = useState([]);

   useEffect(() => {
      async function fetchDistricts() {
         try {
            const { data } = await https.get('/districts');
            const array = data.map(item => ({
               value: item.id,
               label: item.name_uz,
               region_id: item.region_id
            }));
            setDistricts(array);
         } catch (error) {
            console.error(error);
         }
      }
      fetchDistricts();
   }, []);

   return districts;
}