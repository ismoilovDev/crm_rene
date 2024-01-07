import { useState, useEffect, memo, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { alert } from '../../../components/Alert/alert';
import ShartNomaTable from '../../../components/ShartnomaTable/ShartNomaTable';
import CustumPagination from '../../../components/Pagination/CustumPagination';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import DeleteWarning from '../../../components/Warning/DeleteWarning';
import AddOrderForm from '../../../components/Order/AddOrderForm';
import https from '../../../services/https';
import Filters from '../filters';

const role = JSON.parse(window.localStorage.getItem('role'))
const branch_id = +window.localStorage.getItem('branch_id')

const Orders = ({ filters }) => {
   const { page } = useParams()
   const navigate = useNavigate()
   const [code, setCode] = useState('')
   const [count, setCount] = useState(0)
   const [orders, setOrders] = useState([])
   const [loading, setLoading] = useState(true)
   const [deleteID, setDeleteID] = useState(null)
   const [disabled, setDisabled] = useState(false)
   const [currentPage, setCurrentPage] = useState(page)
   const [deleteModal, setDeleteModal] = useState('close')
   const [isPaginateActive, setIsPaginateActive] = useState(false)
   const [addForm, setAddForm] = useState('add_mahsulot_main close')

   const getUrl = useCallback(async () => {
      setLoading(true);
      const url = `/orders?page=${currentPage}&branch_id=${filters?.branch_id}&from=${filters?.from}&to=${filters?.to}&lifetime=${filters?.lifetime}&sector_id=${filters?.sector_id}&product_id=${filters?.product_id}&client_mark=${filters?.client_mark}&order_by=${filters?.order_by}&search=${filters?.query}`;
      try {
         const { data } = await https.get(url);
         setOrders(data?.data);
         setCount(data?.meta?.last_page);
         setIsPaginateActive(true);
      } catch (err) {
         console.log(err);
      } finally {
         setLoading(false);
      }
   }, [currentPage, filters]);

   useEffect(() => {
      getUrl();
   }, [getUrl]);

   async function navigateAdd(e) {
      e.preventDefault()
      console.log(code)
      if (!code) {
         alert("Kodni kiriting", 'error')
      }
      else {
         try {
            const { data } = await https.post('/check/client/code', { code })
            console.log(data)
            navigate("/orders/add", {
               state: {
                  id: data?.id,
                  groups: data?.group
               }
            })

         }
         catch (err) {
            if (err?.request?.status === 404) {
               return (
                  alert("Bunday mijoz yo'q", 'error')
               )
            } else {
               console.log(err);
            }
         }
      }
   }

   function closeForm() {
      setAddForm('add_mahsulot_main close')
   }

   function deleteFun(id) {
      setDeleteModal('open')
      setDeleteID(id)
   }

   const handleOnExcel = async () => {
      setDisabled(true)
      try {
         const url = `/excel-export/orders?branch_id=${filters?.branch_id}&from=${filters?.from}&to=${filters?.to}&lifetime=${filters?.lifetime}&sector_id=${filters?.sector_id}&product_id=${filters?.product_id}&client_mark=${filters?.client_mark}&order_by=${filters?.order_by}&search=${filters?.query}`;
         const response = await https.get(url, {
            responseType: 'blob'
         })
         const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         });

         const downloadLink = document.createElement('a');
         downloadLink.href = window.URL.createObjectURL(blob);
         downloadLink.download = 'Nobank_buyurtmalar.xlsx';
         downloadLink.click();
      } catch (err) {
         alert('Xatolik')
      } finally {
         setDisabled(false)
      }
   }

   return (
      <div className='shart_nama'>
         <AddOrderForm
            navigateAdd={navigateAdd}
            setCode={setCode}
            addForm={addForm}
            closeForm={closeForm}
         />
         <div className='shartnamaMain'>
            <div className='shartnamaHeader'>
               <p className='shartnamaTitle'>Buyurtma</p>
               <button onClick={() => setAddForm('add_mahsulot_main open')} className='shartnamaLink'>
                  Buyurtma
                  <i className='bx bx-plus-circle'></i>
               </button>
            </div>
            <Filters branch_id={branch_id} setCurrentPage={setCurrentPage} handleOnExcel={handleOnExcel} />
            <ShartNomaTable
               loading={loading}
               orders={orders}
               role={role}
               deleteOrder={deleteFun}
            />
            {
               isPaginateActive ? (
                  <div className='pagination_block_wrapper'>
                     <div className='pagination_block'>
                        <CustumPagination
                           count={count}
                           baseURL={'orders'}
                           currentPage={+page}
                           setCurrentPage={setCurrentPage}
                        />
                     </div>
                  </div>
               ) : null
            }
            <DeleteWarning
               id={deleteID}
               path={'orders'}
               list={orders}
               setList={setOrders}
               successText={"Buyurtma o'chirildi"}
               openClose={deleteModal}
               setOpenClose={setDeleteModal}
            />
            <LoaderBackdrop disable={disabled} />
         </div>
      </div>
   )
}

export default memo(Orders)