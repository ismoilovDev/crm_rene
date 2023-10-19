import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Prev from '../../../components/Prev/Prev'
import https from '../../../services/https';


function UserSingle() {
   const [user, setUser] = useState({});
   let { id } = useParams()

   const [filialOptions, setFilialOptions] = useState([])

   function RoleList(array) {
      let arrRole = []
      array?.map(item => {
         arrRole.push(item?.name)
      })
      return arrRole.join(', ')
   }

   async function fetchBranches() {
      const res = await https.get('/all/branches')
      let selectFilial = []
      res?.data?.map((item) => {
         selectFilial.push(
            { value: item?.id, label: item?.name }
         )
      })
      setFilialOptions(selectFilial)
   }

   // Get user Data
   useEffect(() => {
      fetchBranches()

      https
         .get(`/users/${id}`)
         .then(res => {
            setUser(res?.data)
            console.log(res?.data);
         })
         .catch(err => {
            console.log(err);
         })
   }, [])
   return (
      <section>
         <div className='filialform_header'>
            <Prev />
         </div>
         <div className=' single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{user?.name}</h1>
            <div className='pdf_margin_top_15'>
               <div className='single_buyurtma_info'>
                  <div className='single_buyurtma_inputs'>
                     <p>F.I.Sh:</p>
                     <p>{user?.name}</p>
                  </div>
                  <div className='single_buyurtma_inputs'>
                     <p>Email:</p>
                     <p>{user?.email}</p>
                  </div>
                  <div className='single_buyurtma_inputs'>
                     <p>Parol:</p>
                     <p>{user?.password}</p>
                  </div>
                  <div className='single_buyurtma_inputs'>
                     <p>Role:</p>
                     <p>{RoleList(user?.role)}</p>
                  </div>
                  <div className='single_buyurtma_inputs'>
                     <p>Filial:</p>
                     <p>{filialOptions?.find(x=>x.value === user?.branch?.id)?.name}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default UserSingle;