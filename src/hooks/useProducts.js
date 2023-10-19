import { useEffect, useState } from "react";
import https from "../services/https";

export function useProducts() {
   const [products, setProducts] = useState([]);

   useEffect(() => {
      async function fetchProducts() {
         try {
            const { data } = await https.get('/products');
            const true_data = data?.data.map(item => {
               return {
                  label: item.name,
                  value: item.id,
                  code: item.code
               }
            });
            setProducts(true_data)
         } catch (error) {
            console.error(error);
         }
      }
      fetchProducts();
   }, []);

   return products;
}