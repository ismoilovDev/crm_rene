import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Tooltip } from '@nextui-org/react'
import SkeletonBox from '../Loader/Skeleton'
import dateConvert from '../../utils/functions/dateConvert'

const userID = JSON.parse(window.localStorage.getItem('user_id'))

function ShartNomaTable({ loading, orders, role, deleteOrder, isSingleClients = false }) {
   const navigate = useNavigate()
   // Functions to sort ---------------->
   function dataSort(data) {
      if (data === "accepted") {
         return "tasdiqlangan"
      } else if (data === "denied") {
         return "rad etilgan"
      } else if (data === 'pending') {
         return "kutilmoqda"
      } else {
         return 'unknown'
      }
   }

   function idSort(data) {
      if (data === "accepted") {
         return "green"
      } else if (data === "denied") {
         return "red"
      } else if (data === "pending") {
         return "yellow"
      }

   }

   function fullName(name) {
      let nameArr = name?.split(' ')
      function DoubleLetter(name) {
         if (name?.slice(0, 2) === 'Sh' || name?.slice(0, 2) === 'Ch' || name?.slice(0, 2) === 'ch' || name?.slice(0, 2) === 'sh') {
            return (name?.slice(0, 2))
         } else {
            return (name?.slice(0, 1))
         }
      }

      if (nameArr?.length == 2) {
         return `${nameArr?.[0]} ${DoubleLetter(nameArr?.[1])}.`
      } else if (nameArr?.length >= 3) {
         return `${nameArr?.[0]} ${DoubleLetter(nameArr?.[1])}.${DoubleLetter(nameArr?.[2])}.`
      } else {
         return name
      }
   }

   // Collecting User Id order_results
   function OrderResults(array) {
      let ids = []
      array?.map(item => {
         ids?.push(item?.user_id)
      })
      return ids?.includes(userID)
   }

   return (
      <div className='shartnamaTablePart table_root'>
         <div className="responsive_table">
            <div className='shartTable table_header'>
               <div className='tableHeader'>
                  {
                     isSingleClients ? null : <p className='headerTable-title_buyurtma'>F.I.Sh</p>
                  }
                  <p className='headerTable-title_buyurtma'>Kodi</p>
                  <p className='headerTable-title_buyurtma'>Sanasi</p>
                  <p className='headerTable-title_buyurtma'>Guruh</p>
                  <p className='headerTable-title_buyurtma'>Status</p>
               </div>
            </div>
            {
               loading ? (
                  <SkeletonBox />
               ) :
                  <ul className='tableInfo table_body'>
                     {
                        orders?.length > 0 ? (
                           orders?.map(item => {
                              return (
                                 <li className='client_row' key={item?.id}>
                                    {
                                       isSingleClients ? null :
                                          <p className='li_buyurtma' onDoubleClick={() => { navigate(`/orders/single/${item?.id}`) }}>
                                             <Tooltip content={item?.client_mark_exist ? "KL to'ldirilgan" : "KL to'ldirilmagan"} placement="topStart">
                                                {fullName(item?.client?.name)}
                                                <span className={item?.client_mark_exist ? 'kl_status green' : 'kl_status red'}></span>
                                             </Tooltip>
                                          </p>
                                    }
                                    <p className='li_buyurtma' onDoubleClick={() => { navigate(`/orders/single/${item?.id}`) }}>
                                       {item?.code}
                                    </p>
                                    <p className='li_buyurtma' onDoubleClick={() => { navigate(`/orders/single/${item?.id}`) }}>
                                       {dateConvert(item?.order_date)}
                                    </p>
                                    <p className='li_buyurtma' onDoubleClick={() => { navigate(`/orders/single/${item?.id}`) }}>
                                       {item?.group?.name ? item?.group?.name : 'guruhsiz'}
                                    </p>
                                    <p className='li_buyurtma' onDoubleClick={() => { navigate(`/orders/single/${item?.id}`) }} id={idSort(item?.status)}>
                                       {dataSort(item?.status)}
                                    </p>
                                    <div className='userButtons_buyurtma'>
                                       <button><Link to={`/orders/single/${item?.id}`}><i className='bx bx-user'></i></Link></button>
                                       {role?.includes('admin') || role.includes('director') || role.includes('monitoring') ? (
                                          <>
                                             <button className={OrderResults(item?.order_results) ? "voted" : ""}><Link to={`/orders/edit/${item?.id}`}><i className='bx bx-edit-alt'></i></Link></button>
                                          </>
                                       ) : <></>}
                                       {role?.includes('admin') ? (
                                          <button onClick={() => deleteOrder(item?.id)}><i className='bx bx-trash'></i></button>
                                       ) : <></>}
                                    </div>
                                 </li>
                              )
                           })
                        ) : <pre className="empty_table">Buyurtma topilmadi</pre>
                     }
                  </ul>
            }
         </div>
      </div>
   )
}

export default memo(ShartNomaTable)