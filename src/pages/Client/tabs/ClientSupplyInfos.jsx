import { memo, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { RiAddLine } from 'react-icons/ri'
import { ClientContext } from '../../../context/context'
import { translateType } from '../../../components/Order/Functions'
import DeleteWarning from '../../../components/Warning/DeleteWarning'
import SkeletonBox from '../../../components/Loader/Skeleton'
import https from '../../../services/https'


const role = JSON.parse(window.localStorage.getItem('role'))

const SupplyInfosTable = memo(({ loading, supplyInfos, singlePage, deleteFun, editPage, role }) => {
   const formattedNumber = (sum, type) => {
      if (sum) {
         return sum?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
         })
      }
      else if (type === "guarrantor") {
         return "Kafillik"
      } else {
         return "Ishonch"
      }
   }

   return (
      <div className='table_root'>
         <div className='responsive_table client_supply_infos_table'>
            <div className='tableHeader table_header'>
               <p className='headerTable-title_shartnoma'>Ta'minot summasi</p>
               <p className='headerTable-title_shartnoma'>Ta'minot turi</p>
            </div>
            {
               loading ? (
                  <SkeletonBox />
               ) : (
                  <ul className='tableInfo table_body'>
                     {
                        supplyInfos?.length > 0 ? (
                           supplyInfos?.map((item, index) => {
                              return (
                                 <li className='client_row' key={index}>
                                    <p className='li_shartnoma' onDoubleClick={() => { singlePage(item?.type, item?.id) }}>{formattedNumber(item?.sum, item?.type)}</p>
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
                        ) : <pre className="empty_table">Mijozning ta'minotlari mavjud emas</pre>
                     }
                  </ul>
               )
            }
         </div>
      </div>
   )
})

function ClientSupplyInfos({ id }) {
   const navigate = useNavigate()
   const { client } = useContext(ClientContext)
   const [deleteModal, setDeleteModal] = useState('close')
   const [supplyInfos, setSupplyInfos] = useState([])
   const [deleteID, setDeleteID] = useState(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      getClientSupplyInfos()
   }, [id])

   async function getClientSupplyInfos() {
      if (client?.id) {
         try {
            const res = await https.get(`/clients/${client?.id}/supply-infos`);
            if (res.status === 200) {
               setLoading(false)
               setSupplyInfos([...res.data])
            }
         } catch (err) {
            console.log(err)
         }
      }
   }

   const memoizedSupplyInfos = useMemo(() => supplyInfos, [supplyInfos]);

   const toCreateSupplyInfo = async () => {
      await navigate('/supplies/add', {
         state: {
            id: client?.id,
         }
      })
   }

   function singlePage(type, id) {
      if (type === 'gold') {
         navigate(`/supplies/single-gold/${id}`, { replace: false })
      } else if (type === 'auto') {
         navigate(`/supplies/single-auto/${id}`, { replace: false })
      } else if (type === 'guarrantor') {
         navigate(`/supplies/single-owner/${id}`, { replace: false })
      } else if (type === 'insurance') {
         navigate(`/supplies/single-insurance/${id}`, { replace: false })
      }
   }

   function editPage(type, id) {
      if (type === 'gold') {
         navigate(`/supplies/edit-gold/${id}`, { replace: false })
      } else if (type === 'auto') {
         navigate(`/supplies/edit-auto/${id}`, { replace: false })
      } else if (type === 'guarrantor') {
         navigate(`/supplies/edit-owner/${id}`, { replace: false })
      } else if (type === 'insurance') {
         navigate(`/supplies/edit-insurance/${id}`, { replace: false })
      }
   }

   function deleteFun(id) {
      setDeleteModal('open')
      setDeleteID(id)
   }

   return (
      <div className='single_client_content_list'>
         <h3>Ta'minotlari</h3>
         <div className="order_control_btns">
            <button onClick={toCreateSupplyInfo}>
               <RiAddLine />
            </button>
         </div>
         <SupplyInfosTable
            loading={loading}
            supplyInfos={memoizedSupplyInfos}
            singlePage={singlePage}
            deleteFun={deleteFun}
            editPage={editPage}
            role={role}
         />
         <DeleteWarning
            id={deleteID}
            path={'supply-info'}
            list={supplyInfos}
            setList={setSupplyInfos}
            successText={"Taminot o'chirildi"}
            openClose={deleteModal}
            setOpenClose={setDeleteModal}
         />
      </div>
   )
}

export default memo(ClientSupplyInfos)