import { useEffect, useState } from "react"
import https from "../services/https"

export const useBranches = () => {
   const [branches, setBranches] = useState([])

   useEffect(() => {
      const fetchDatas = async () => {
         try {
            const { data } = await https.get('/branches')
            const array = data?.data.map(item => ({
               label: item.short_name,
               value: item.id
            }));
            setBranches(array)
         }
         catch (err) {
            console.log(err)
         }
      }

      fetchDatas()
   }, [])

   return branches
}