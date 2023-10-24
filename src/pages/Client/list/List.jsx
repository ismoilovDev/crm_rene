import { memo, useCallback, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CustumPagination from '../../../components/Pagination/CustumPagination';
import DeleteWarning from '../../../components/Warning/DeleteWarning';
import SkeletonBox from '../../../components/Loader/Skeleton';
import https from '../../../services/https';
import Filters from '../filters';
import { ExcelButton } from '../../../components/Buttons/ExcelBtn';

const role = JSON.parse(window.localStorage.getItem('role'))

function Clients({ filters }) {
   const { page } = useParams()
   const navigate = useNavigate()
   const [count, setCount] = useState(0)
   const [clients, setClients] = useState([])
   const [loading, setLoading] = useState(true)
   const [deleteID, setDeleteID] = useState(null)
   const [currentPage, setCurrentPage] = useState(page)
   const [deleteModal, setDeleteModal] = useState('close')
   const [isPaginateActive, setIsPaginateActive] = useState(false)

   const getUrl = useCallback(async () => {
      setLoading(true)
      const url = `/clients?page=${currentPage}&branch_id=&region_id=${filters?.region_id}&district_id=${filters?.district_id}&gende=${filters?.gender}&from_created_at=${filters?.from}&to_created_at=${filters?.to}&search=${filters?.query}`;

      try {
         const { data } = await https.get(url)
         setClients(data?.data)
         setCount(data?.meta?.last_page)
         setIsPaginateActive(true)
         setLoading(false)
      }
      catch (err) {
         console.log(err)
      }
   }, [currentPage, filters])

   useEffect(() => {
      getUrl()
   }, [getUrl]);

   function deleteFun(id) {
      setDeleteModal('open')
      setDeleteID(id)
   }

   const handleOnExcel = () =>{
      let data = []
      clients?.map(item =>{
         const info = {
            "F.I.Sh": item?.name, 
            kod: item?.code, 
            pinfl: `${item?.pinfl}`,
            shahar : item?.region?.name_uz
         }
         data = [...data, info]
      })

      return data;
   }

   return (
      <div className='client'>
         <div className='client_title'>
            <p>Mijozlar</p>
         </div>
         <div className='client_addition'>
            <Link className='client_button gradient-border' to='/clients/add'>
               <p>Mijoz Qo'shish</p> <i className='bx bx-plus-circle'></i>
            </Link>
            <ExcelButton data={handleOnExcel()} name={"Mijoz"} />
         </div>

         <Filters />

         <div className='clientTablePart table_root'>
            <div className='clientTable responsive_table'>
               <div className='clienttableHeader table_header'>
                  <p className='clientheaderTable-title'>F.I.Sh.</p>
                  <p className='clientheaderTable-title'>Kod</p>
                  <p className='clientheaderTable-title'>PinFl</p>
                  <p className='clientheaderTable-title'>Shahar</p>
                  <p className='clientheaderTable-title'></p>
               </div>
               {
                  loading ? (
                     <SkeletonBox />
                  ) :
                     <ul className='clienttableInfo table_body'>
                        {
                           clients?.length > 0 ? (
                              clients?.map(item => {
                                 return (
                                    <li className='client_row' key={item.id}>
                                       <p className='clientliName li' onDoubleClick={() => { navigate(`/clients/${item?.id}/`) }}>{item?.name}</p>
                                       <p className='li' onDoubleClick={() => { navigate(`/clients/${item?.id}/`) }}>{item?.code}</p>
                                       <p className='li' onDoubleClick={() => { navigate(`/clients/${item?.id}/`) }}>{item?.pinfl}</p>
                                       <p className='li' onDoubleClick={() => { navigate(`/clients/${item?.id}/`) }}>{item?.region?.name_uz}</p>
                                       <div className='clientuserButtons'>
                                          <button>
                                             <Link to={`/clients/${item?.id}/`}><i className='bx bx-user'></i></Link>
                                          </button>
                                          {role.includes('admin') || role.includes('monitoring') ? (
                                             <button>
                                                <Link to={`/clients/${item?.id}/`}>
                                                   <i className='bx bx-edit-alt'></i>
                                                </Link>
                                             </button>
                                          ) : <></>}
                                          {role.includes('admin') ? (
                                             <>
                                                <button onClick={() => deleteFun(item?.id)}><i className='bx bx-trash'></i></button>
                                             </>
                                          ) : <></>}
                                       </div>
                                    </li>
                                 )
                              })
                           ) : <pre className="empty_table">Mijoz topilmadi</pre>
                        }
                     </ul>
               }
            </div>
         </div>
         {
            isPaginateActive ? (
               <div className='pagination_block_wrapper'>
                  <div className='pagination_block'>
                     <CustumPagination
                        count={count}
                        baseURL="clients"
                        currentPage={+page}
                        setCurrentPage={setCurrentPage}
                     />
                  </div>
               </div>
            ) : null
         }
         <DeleteWarning
            id={deleteID}
            path={'clients'}
            list={clients}
            setList={setClients}
            successText={"Mijoz o'chirildi"}
            openClose={deleteModal}
            setOpenClose={setDeleteModal}
         />
      </div>
   )
}

export default memo(Clients)