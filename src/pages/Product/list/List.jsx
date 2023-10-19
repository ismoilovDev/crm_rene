import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Input } from '@nextui-org/react'
import { alert } from '../../../components/Alert/alert'
import SkeletonBox from '../../../components/Loader/Skeleton';
import CustumPagination from '../../../components/Pagination/CustumPagination';
import DeleteWarning from '../../../components/Warning/DeleteWarning';
import SearchForm from '../../../components/Search/SearchForm';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import https from '../../../services/https';

const role = JSON.parse(window.localStorage.getItem('role'))

function Products() {
   const { page } = useParams()
   const searchInput = useRef(null)
   const [count, setCount] = useState('')
   const [loading, setLoading] = useState(true)
   const [mahsulotlar, setMahsulotlar] = useState([])
   const [disable, setDisable] = useState(false)
   const [addForm, setAddForm] = useState('add_mahsulot_main close')
   const [currentPage, setCurrentPage] = useState(page)
   const [isPaginateActive, setIsPaginateActive] = useState(false)
   const [deleteModal, setDeleteModal] = useState('close')
   const [deleteID, setDeleteID] = useState(null)

   const { register, handleSubmit } = useForm();

   function openForm() {
      setAddForm('add_mahsulot_main open')
   }

   function closeForm() {
      setAddForm('add_mahsulot_main close')
   }

   async function getUrl() {
      setLoading(true)
      await https
         .get(`/products?page=${page}`)
         .then(({ data }) => {
            setMahsulotlar(data?.data)
				setCount(data?.meta?.last_page)
            setLoading(false)
            setIsPaginateActive(true)
         })
   }

   useEffect(() => {
      getUrl()
   }, [currentPage]);

   function searchContents(e) {
      e.preventDefault();
      e.stopPropagation();
      setLoading(true);
      let formdata = new FormData();
      formdata.append('search', searchInput.current.value)
      https
         .post(`/search/products`, formdata)
         .then(({ data }) => {
            setLoading(false)
            setIsPaginateActive(false)
            let results = data.data
            setMahsulotlar([...results])
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

   const onSubmit = (data) => {
      setDisable(true)

      https
         .post('/products', data)
         .then((res) => {
            if (res.request.status === 200 || res.request.status === 201) {
               setAddForm('add_mahsulot_main close')
               setDisable(false)
               alert("Mahsulot qo'shildi", 'success')
               getUrl()
            }
         })
         .catch((err) => {
            setDisable(false)
            alert(err?.response?.data?.message, 'error')
         })
   }

   return (
      <>
         <form className={addForm} onSubmit={handleSubmit(onSubmit)}>
            <p>Mahsulot qo'shish</p>
            <Input
               rounded
               bordered
               placeholder="Nomi..."
               color="secondary"
               width='100%'
               label="Mahsulot nomi"
               className='margin_bottom'
               {...register("name", { required: true })}
            />
            <Input
               rounded
               bordered
               placeholder="Kodi..."
               color="secondary"
               width='100%'
               label="Mahsulot kodi"
               {...register("code", { required: true })}
            />
            <div className='add_mahsulot_buttons'>
               <button onClick={closeForm} type='button'>Orqaga</button>
               <button type='submit'>Qoshish</button>
            </div>
         </form>

         <section className='mahsulot_section'>
            <h1 className='filial_title'>Mahsulotlar</h1>
            <div className='filial_header'>
               <a onClick={openForm}>
                  Mahsulot Qo'shish
                  <i className='bx bx-plus-circle'></i>
               </a>
               <SearchForm
                  searchContents={searchContents}
                  checkSearch={checkSearch}
                  searchInput={searchInput}
                  placeholder="Mahsulot..."
               />
            </div>

            <div className='mahsulot_table table_root'>
               <div className="responsive_table">
                  <div className='mahsulot_table_headers table_header'>
                     <p>Mahsulot nomi</p>
                     <p>Mahsulot kodi</p>
                  </div>
                  {
                     loading ? (
                        <SkeletonBox />
                     ) : (
                        <div className='mahsulot_table_products table_body'>
                           {
                              mahsulotlar?.length ? (
                                 mahsulotlar.map((item, index) => {
                                    return (
                                       <div className='mahsulot_table_product client_row' key={index}>
                                          <p>{item.name}</p>
                                          <p>{item.code}</p>
                                          <div className='mahsulot_product_buttons'>
                                             {role.includes('admin') ? (
                                                <>
                                                   <button><Link to={`/products/edit/${item?.id}`}><i className='bx bx-edit-alt white'></i></Link></button>
                                                   <button onClick={() => { deleteFun(item?.id) }}><i className='bx bx-trash'></i></button>
                                                </>
                                             ) : <></>}
                                          </div>
                                       </div>
                                    )
                                 })
                              ) : <pre className="empty_table">Mahsulot topilmadi</pre>
                           }
                        </div>
                     )
                  }
               </div>
            </div>
            {
               isPaginateActive ? (
                  <div className='pagination_block_wrapper'>
                     <div className='pagination_block'>
                        <CustumPagination
                           count={count}
                           baseURL="products"
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
               path={'products'}
               list={mahsulotlar}
               setList={setMahsulotlar}
               successText={"Mahsulot o'chirildi"}
               openClose={deleteModal}
               setOpenClose={setDeleteModal}
            >
            </DeleteWarning>

            <LoaderBackdrop disable={disable} />
         </section>
      </>
   )
}

export default Products