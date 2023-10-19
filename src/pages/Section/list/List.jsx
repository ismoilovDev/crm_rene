import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { Input } from '@nextui-org/react'
import { alert } from '../../../components/Alert/alert';
import DeleteWarning from '../../../components/Warning/DeleteWarning';
import SkeletonBox from '../../../components/Loader/Skeleton';
import CustumPagination from '../../../components/Pagination/CustumPagination';
import SearchForm from '../../../components/Search/SearchForm';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import https from '../../../services/https';

const role = JSON.parse(window.localStorage.getItem('role'))

function Sections() {
   const { page } = useParams()
   const searchInput = useRef(null)
   const [count, setCount] = useState('')
   const [loading, setLoading] = useState(true)
   const [addFormSection, setAddFormSection] = useState('add_mahsulot_main close')
   const [sectionlar, setSectionlar] = useState([])
   const [disable, setDisable] = useState(false)
   const [currentPage, setCurrentPage] = useState(page)
   const [isPaginateActive, setIsPaginateActive] = useState(false)
   const [deleteModal, setDeleteModal] = useState('close')
   const [deleteID, setDeleteID] = useState(null)
   const { register, handleSubmit } = useForm();

   async function getUrl() {
      setLoading(true)
      await https
         .get(`/sections?page=${page}`)
         .then(({ data }) => {
            setSectionlar(data?.data)
				setCount(data?.meta?.last_page)
            setLoading(false)
            setIsPaginateActive(true)
         })
   }

   useEffect(() => {
      getUrl()
   }, [currentPage]);


   // Search Contents ----------->
   function searchContents(e) {
      e.preventDefault();
      e.stopPropagation();
      setLoading(true);
      let formdata = new FormData();
      formdata.append('search', searchInput.current.value)
      https
         .post(`/search/sections`, formdata)
         .then(({ data }) => {
            setLoading(false)
            setIsPaginateActive(false)
            let results = data.data
            setSectionlar([...results])
         })
         .catch(err => {
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

   // Open and CLose Modal
   function openFormSection() {
      setAddFormSection('add_mahsulot_main open')
   }
   function closeFormSection() {
      setAddFormSection('add_mahsulot_main close')
   }

   const onSubmit = (data) => {
      setDisable(true)

      https
         .post('/sections', data)
         .then(res => {
            if (res.request.status === 200 || res.request.status === 201) {
               setAddFormSection('add_mahsulot_main close')
               setDisable(false)
               alert("Bo'lim qo'shildi", 'success')
               getUrl()
            }
         })
         .catch(err => {
            setDisable(false)
            alert(err?.response?.data?.message, 'error')
         })
   }

   return (
      <>
         <form className={addFormSection} onSubmit={handleSubmit(onSubmit)}>
            <p>Bo'lim qo'shish</p>
            <Input
               rounded
               bordered
               placeholder="Nomi..."
               color="secondary"
               width='100%'
               label="Bo'lim nomi"
               className='margin_bottom'
               {...register("name", { required: true })}
            />
            <div className='add_mahsulot_buttons'>
               <button onClick={closeFormSection} type='reset'>Orqaga</button>
               <button type='submit'>Qoshish</button>
            </div>
         </form>

         <section className='section_main'>
            <h1 className='filial_title'>Bo'limlar</h1>
            <div className='filial_header'>
               <a onClick={openFormSection}>
                  Bo'lim Qo'shish
                  <i className='bx bx-plus-circle'></i>
               </a>
               <SearchForm
                  searchContents={searchContents}
                  checkSearch={checkSearch}
                  searchInput={searchInput}
                  placeholder="Bo'lim..."
               />
            </div>

            <div className='mahsulot_table table_root'>
               <div className="responsive_table">
                  <div className='mahsulot_table_headers table_header'>
                     <p>Bo'lim nomi</p>
                     <p>Bo'lim kodi</p>
                  </div>
                  {
                     loading ? (
                        <SkeletonBox />
                     ) :
                        <div className='mahsulot_table_products table_body'>
                           {
                              sectionlar?.length > 0 ? (
                                 sectionlar?.map(item => {
                                    return (
                                       <div className='mahsulot_table_product client_row' key={item?.id}>
                                          <p>{item?.name}</p>
                                          <p>{item?.id}</p>
                                          <div className='mahsulot_product_buttons'>
                                             {role.includes('admin') ? (
                                                <>
                                                   <button><Link to={`/sections/edit/${item?.id}`}><i className='bx bx-edit-alt white'></i></Link></button>
                                                   <button onClick={() => { deleteFun(item?.id) }}><i className='bx bx-trash'></i></button>
                                                </>
                                             ) : <></>}
                                          </div>
                                       </div>
                                    )
                                 })
                              ) : <pre className="empty_table">Bo'lim topilmadi</pre>
                           }
                        </div>
                  }
               </div>
            </div>
            {
               isPaginateActive ? (
                  <div className='pagination_block_wrapper'>
                     <div className='pagination_block'>
                        <CustumPagination
                           count={count}
                           currentPage={+page}
                           baseURL="sections"
                           setCurrentPage={setCurrentPage}
                        />
                     </div>
                  </div>
               ) : null
            }
            {/* Delete */}
            <DeleteWarning
               id={deleteID}
               path={'sections'}
               list={sectionlar}
               setList={setSectionlar}
               successText={"Bo'lim o'chirildi"}
               openClose={deleteModal}
               setOpenClose={setDeleteModal}
            >
            </DeleteWarning>

            <LoaderBackdrop disable={disable} />
         </section>
      </>
   )
}

export default Sections