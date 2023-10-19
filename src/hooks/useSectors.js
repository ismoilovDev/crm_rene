import { useEffect, useState } from "react";
import https from "../services/https";

export function useSectors() {
   const [sectors, setSectors] = useState([]);

   useEffect(() => {
      async function fetchSectors() {
         try {
            const { data } = await https.get('/sectors');
            const true_data = data?.splice(1, data.length).map(item => {
               return {
                  label: item.name,
                  value: item.id
               }
            });
            setSectors(true_data)
         } catch (error) {
            console.error(error);
         }
      }
      fetchSectors();
   }, []);

   return sectors;
}