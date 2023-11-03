import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import https from '../../../services/https';
import { alert } from '../../../components/Alert/alert';
import SkeletonBox from '../../../components/Loader/Skeleton';
import SearchForm from '../../../components/Search/SearchForm';
import AddOrderForm from '../../../components/Order/AddOrderForm';
import { translateType } from '../../../components/Order/Functions';
import DeleteWarning from '../../../components/Warning/DeleteWarning';
import { ContainerExcelButton } from '../../../components/Buttons/ExcelBtn';
import CustumPagination from '../../../components/Pagination/CustumPagination';

const role = JSON.parse(window.localStorage.getItem('role'))

function SupplyList() {
   const { page } = useParams()
   const searchInput = useRef(null)
   const navigate = useNavigate();
   const [code, setCode] = useState('')
   const [count, setCount] = useState('')
   const [loading, setLoading] = useState(true)
   const [taminotlar, setTaminotlar] = useState([]);
   const [currentPage, setCurrentPage] = useState(page)
   const [isPaginateActive, setIsPaginateActive] = useState(false)
   const [modal, setModal] = useState('add_mahsulot_main close')
   const [deleteModal, setDeleteModal] = useState('close')
   const [deleteID, setDeleteID] = useState(null)

   async function getUrl() {
      setLoading(true)
      await https
         .get(`/supply-info?page=${page}`)
         .then(({ data }) => {
            setTaminotlar(data?.data)
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

   function navigateAdd(e) {
      e.preventDefault()
      if (!code) {
         alert("Kodni kiriting", 'error')
      } else {
         const dataId = {
            code: code
         }

         https
            .post('/check/client/code', dataId)
            .then(res => {
               navigate("/supplies/add", { state: { id: res?.data?.id } })
            })
            .catch(err => {
               if (err?.request?.status === 404) {
                  alert("Bunday mijoz yo'q", 'error')
               } else {
                  console.log(err);
               }
            })
      }
   }

   function closeForm() {
      setModal('add_mahsulot_main close')
   }

   function searchContents(e) {
      e.preventDefault();
      e.stopPropagation();
      setLoading(true);
      let formdata = new FormData();
      formdata.append('search', searchInput.current.value)
      https
         .post(`/search/supply_infos`, formdata)
         .then(({ data }) => {
            setLoading(false)
            setIsPaginateActive(false)
            const results = data?.data
            console.log(results);
            setTaminotlar([...results])
         })
         .catch(_ => {
            searchInput.current.value == "" ? (
               getUrl()
            ) : console.log("Xato")
         })
   }

   function checkSearch(text) {
      if (text === "") {
         getUrl()
      }
   }

   function deleteFun(id) {
      setDeleteModal('open')
      setDeleteID(id)
   }

   function singlePage(type, id) {
      if (type == 'gold') {
         navigate(`/supplies/single-gold/${id}`, { replace: false })
      } else if (type == 'auto') {
         navigate(`/supplies/single-auto/${id}`, { replace: false })
      } else if (type == 'guarrantor') {
         navigate(`/supplies/single-owner/${id}`, { replace: false })
      } else if (type == 'insurance') {
         navigate(`/supplies/single-insurance/${id}`, { replace: false })
      }
   }

   function editPage(type, id) {
      if (type == 'gold') {
         navigate(`/supplies/edit-gold/${id}`, { replace: false })
      } else if (type == 'auto') {
         navigate(`/supplies/edit-auto/${id}`, { replace: false })
      } else if (type == 'guarrantor') {
         navigate(`/supplies/edit-owner/${id}`, { replace: false })
      } else if (type == 'insurance') {
         navigate(`/supplies/edit-insurance/${id}`, { replace: false })
      }
   }

   const handleOnExcel = () =>{
      let data = []
      taminotlar?.map(item =>{
         const info = {
            "F.I.Sh": item?.client?.name, 
            summasi: item?.sum || "-", 
            mahsulot_nomi: translateType(item?.type)
         }
         data = [...data, info]
      })
      return data;
   }

   return (
      <section className='taminot'>
         <AddOrderForm
            navigateAdd={navigateAdd}
            setCode={setCode}
            addForm={modal}
            closeForm={closeForm}
         />
         <div className='taminot_header'>
            <div className='taminot_title'>Ta'minot</div>
            <div className='taminot_subheader'>
               <button onClick={() => setModal('add_mahsulot_main open')} className='taminot_link'>
                  Ta'minot Qo'shish <i className='bx bx-plus-circle'></i>
               </button>
               <SearchForm
                  searchContents={searchContents}
                  checkSearch={checkSearch}
                  searchInput={searchInput}
                  placeholder="Taminot..."
               />
            </div>
            <ContainerExcelButton data={handleOnExcel()} name={"Ta'minot"} />
         </div>

         <div className='shartnamaTablePart table_root margin_top_15'>
            <div className='shartTable responsive_table'>
               <div className='tableHeader table_header'>
                  <p className='headerTable-title_shartnoma'>F.I.Sh</p>
                  <p className='headerTable-title_shartnoma'>Taminot summasi</p>
                  <p className='headerTable-title_shartnoma'>Mahsulot nomi</p>
               </div>
               {
                  loading ? (
                     <SkeletonBox />
                  ) : (
                     <ul className='tableInfo table_body'>
                        {
                           taminotlar?.length > 0 ? (
                              taminotlar?.map((item, index) => {
                                 return (
                                    <li className='client_row' key={index}>
                                       <p className='liName li_shartnoma' onDoubleClick={() => { singlePage(item?.type, item?.id) }}>{item?.client?.name}</p>
                                       <p className='li_shartnoma' onDoubleClick={() => { singlePage(item?.type, item?.id) }}>{item?.sum?.toLocaleString() || "-"}</p>
                                       <p className='li_shartnoma' onDoubleClick={() => { singlePage(item?.type, item?.id) }}>{translateType(item?.type)}</p>
                                       <div className='userButtons_shartnoma'>
                                          <button onClick={() => { singlePage(item?.type, item?.id) }}><i className='bx bx-user'></i></button>
                                          <button onClick={() => { editPage(item?.type, item?.id) }}><i className='bx bx-edit-alt'></i></button>
                                          {
                                             role.includes('admin') ? (
                                                <>
                                                   <button onClick={() => { deleteFun(item?.id) }}><i className='bx bx-trash'></i></button>
                                                </>
                                             ) : <></>
                                          }
                                       </div>
                                    </li>
                                 )
                              })
                           ) : <pre className="empty_table">Taminot topilmadi</pre>
                        }
                     </ul>
                  )
               }
            </div>
         </div>
         <>
            {
               isPaginateActive ? (
                  <div className='pagination_block_wrapper'>
                     <div className='pagination_block'>
                        <CustumPagination
                           count={count}
                           baseURL="supplies"
                           currentPage={+page}
                           setCurrentPage={setCurrentPage}
                        />
                     </div>
                  </div>
               ) : null
            }
            <DeleteWarning
               id={deleteID}
               path={'supply-info'}
               list={taminotlar}
               setList={setTaminotlar}
               successText={"Taminot o'chirildi"}
               openClose={deleteModal}
               setOpenClose={setDeleteModal}
            />
         </>
      </section>
   )
}

export default SupplyList