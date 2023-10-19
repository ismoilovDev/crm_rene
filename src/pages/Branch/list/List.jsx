import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import CustumPagination from '../../../components/Pagination/CustumPagination';
import DeleteWarning from '../../../components/Warning/DeleteWarning'
import SearchForm from '../../../components/Search/SearchForm'
import SkeletonBox from '../../../components/Loader/Skeleton'
import https from '../../../services/https'

function Branches() {
   const { page } = useParams()
   let navigate = useNavigate()
   const [filiallar, setFiliallar] = useState([])
   const [loading, setLoading] = useState(true);
   const role = JSON.parse(window.localStorage.getItem('role'))
   const [deleteModal, setDeleteModal] = useState('close')
   const [deleteID, setDeleteID] = useState(null)
   const [currentPage, setCurrentPage] = useState(page)
   const [isPaginateActive, setIsPaginateActive] = useState(false)
   const [count, setCount] = useState('')
   const searchInput = useRef(null)

   async function getUrl() {
      setLoading(true)
      await https
         .get(`/branches?page=${page}`)
         .then(({ data }) => {
            setFiliallar(data?.data)
            setCount(data?.meta?.last_page)
            setLoading(false)
            setIsPaginateActive(true)
         })
         .catch(err => {
            console.log(err)
         })
   }

   useEffect(() => {
      getUrl()
   }, [currentPage]);

   function deleteFun(id) {
      setDeleteModal('open')
      setDeleteID(id)
   }

   function searchContents(e) {
      e.preventDefault();
      e.stopPropagation();
      setLoading(true);
      let formdata = new FormData();
      formdata.append('search', searchInput.current.value)
      https
         .post(`/search/branches`, formdata)
         .then(({ data }) => {
            setLoading(false)
            setIsPaginateActive(false)
            const results = data.data
            setFiliallar([...results])
         })
         .catch(err => {
            searchInput.current.value == "" ? (
               getUrl()
            ) : console.log(err)
         })
   }

   function checkSearch(text) {
      if (text === "") {
         getUrl()
      }
   }

   return (
      <section className='filial'>
         <h1 className='filial_title'>Filiallar</h1>
         <div className='filial_header'>
            <Link to='/branches/add'>
               Filial Qo'shish
               <i className='bx bx-plus-circle'></i>
            </Link>
            <SearchForm
               searchContents={searchContents}
               checkSearch={checkSearch}
               searchInput={searchInput}
               placeholder="Filial..."
            />
         </div>
         <div className='filial_table_block'>
            <div className="table_root">
               <div className='filial_table responsive_table'>
                  <div className='filial_table_header table_header'>
                     <p>Qisqa nomi</p>
                     <p>Manzil</p>
                     <p>Shahar</p>
                  </div>
                  {
                     loading ? (
                        <SkeletonBox />
                     ) :
                        <ul className="table_body">
                           {
                              filiallar?.length > 0 ? (
                                 filiallar?.map((item, index) => {
                                    return (
                                       <li key={index} className='filial_table_products client_row'>
                                          <p className='filial_table_product' onDoubleClick={() => { navigate(`/branches/single/${item?.id}`) }}>{item?.short_name || item?.name}</p>
                                          <p className='filial_table_product' onDoubleClick={() => { navigate(`/branches/single/${item?.id}`) }}>{item?.address}</p>
                                          <p className='filial_table_product' onDoubleClick={() => { navigate(`/branches/single/${item?.id}`) }}>{item?.city}</p>
                                          <div className='filial_table_product'>
                                             <button><Link to={`/branches/single/${item?.id}`}><i className='bx bx-user white'></i></Link></button>
                                             {role.includes('admin') ? (
                                                <>
                                                   <button><Link to={`/branches/edit/${item?.id}`}><i className='bx bx-edit-alt white'></i></Link></button>
                                                   <button onClick={() => deleteFun(item?.id)}><i className='bx bx-trash'></i></button>
                                                </>
                                             ) : <></>}
                                          </div>
                                       </li>
                                    )
                                 })
                              ) : <pre className="empty_table">Filial topilmadi</pre>
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
                           baseURL="branches"
                           currentPage={+page}
                           setCurrentPage={setCurrentPage}
                        />
                     </div>
                  </div>
               ) : null
            }
            {/* Delete */}
            <DeleteWarning
               id={deleteID}
               path={'branches'}
               list={filiallar}
               setList={setFiliallar}
               successText={"Filial o'chirildi"}
               openClose={deleteModal}
               setOpenClose={setDeleteModal}
            />
         </div>
      </section >
   )
}

export default Branches