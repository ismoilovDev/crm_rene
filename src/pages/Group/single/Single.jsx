import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai'
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';

function SingleGroup() {
   const { id } = useParams()
   const navigate = useNavigate()
   const [group, setGroup] = useState({})

   useEffect(() => {
      https
         .get(`/groups/${id}`)
         .then(res => {
            setGroup(res?.data)
            console.log(res?.data);
         })
   }, [])


   function SupplyTypes(supplies) {
      let types = []
      supplies?.map(item => {
         if (!(types?.includes(item?.type))) {
            types?.push(item?.type)
         }
      })
      return types
   }

   function DeniedFun(orders) {
      let rad = 0;
      orders?.map(item => {
         if (item?.status == 'denied') {
            rad++;
         }
      })
      if (rad > orders?.length / 2) {
         return true
      } else {
         return false
      }
   }

   function navigateTo(page, orderId) {
      navigate(`/orders/single/${page}`, { state: { id: orderId } })
   }

   return (
      <section>
         <div className='filialform_header'>
            <Prev />
            <div className='buyurtma_page_buttons group_single_pdf_buttons'>
               <button className='page_button' onClick={() => { navigateTo('b1', group?.activeOrders?.[0]?.id) }} to='/orders/single/b1'>B1</button>
               {
                  group?.activeOrders?.map((item, index) => {
                     return (
                        <button key={index} className='page_button' onClick={() => { navigateTo('av1', item?.id) }} to='/orders/single/av1'>Av<span>{index + 1}</span></button>
                     )
                  })
               }
               {
                  group?.activeOrders?.map((item, index) => {
                     return (
                        SupplyTypes(item?.supply_info)?.includes('auto') ?
                           <button key={index} className='page_button' onClick={() => { navigateTo('b3', item?.id) }} to='/orders/single/b3'>B3</button>
                           : <></>
                     )
                  })
               }
               <button className='page_button' onClick={() => { navigateTo('p1', group?.activeOrders?.[0]?.id) }} to='/orders/single/p1'>P1</button>
               {
                  group?.activeOrders?.[0]?.sign_committee ?
                     <button className='page_button' onClick={() => { navigateTo('p2', group?.activeOrders?.[0]?.id) }} to='/orders/single/p2'>P2</button>
                     : <></>
               }
               {
                  DeniedFun(group?.activeOrders) ?
                     <button className='page_button' onClick={() => { navigateTo('x1', group?.activeOrders?.[0]?.id) }} to='/orders/single/x1'>X1</button>
                     : <></>
               }
               {
                  group?.contract?.contract_num ?
                     <button className='page_button' onClick={() => { navigateTo('s1', group?.activeOrders?.[0]?.id) }} to='/orders/single/s1'>S1</button>
                     : <></>
               }
               {
                  group?.contract?.contract_num ?
                     group?.activeOrders?.map((item, index) => {
                        return (
                           <button key={index} className='page_button' onClick={() => { navigateTo('g1', item?.id) }} to='/orders/single/g1'>G1<span>{index + 1}</span></button>
                        )
                     }) : <></>
               }
               {
                  group?.contract?.contract_num ?
                     <button className='page_button' onClick={() => { navigateTo('gs1', group?.activeOrders?.[0]?.id) }} to='/orders/single/gs1'>GS</button>
                     : <></>
               }
               {
                  <button className='page_button' onClick={() => { navigateTo('k1', group?.activeOrders?.[0]?.id) }} to='/orders/single/k1'>K1</button>
               }
               {
                  group?.contract?.contract_num ?
                     group?.activeOrders?.map((item, index) => {
                        return (
                           SupplyTypes(item?.supply_info)?.includes('auto') || SupplyTypes(item?.supply_info)?.includes('gold') ?
                              (
                                 <>
                                    <button key={index} className='page_button' onClick={() => { navigateTo('kd2', item?.id) }} to='/orders/single/kd2'>KD<span>{index + 1}</span></button>
                                 </>
                              )
                              : <></>
                        )
                     })
                     : <></>
               }
               {
                  group?.contract?.contract_num ?
                     group?.activeOrders?.map((item, index) => {
                        return (
                           SupplyTypes(item?.supply_info)?.includes('auto') || SupplyTypes(item?.supply_info)?.includes('gold') ?
                              (
                                 <>
                                    <button key={index} className='page_button' onClick={() => navigateTo('qd', item?.id)} to='/orders/single/qd'>QD<span>{index + 1}</span></button>
                                 </>
                              )
                              : <></>
                        )
                     })
                     : <></>
               }
               {
                  group?.contract?.contract_num ?
                     group?.activeOrders?.map((item, index) => {
                        return (
                           SupplyTypes(item?.supply_info)?.includes('gold') ?
                              (
                                 <>
                                    <button key={index} className='page_button' onClick={() => { navigateTo('td', item?.id) }} to='/orders/single/td'>TD<span>{index + 1}</span></button>
                                 </>
                              )
                              : <></>
                        )
                     })
                     : <></>
               }

            </div>
         </div>
         <div className='single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{group?.name}</h1>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Guruh kodi:</p>
               <p>{group?.code}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
               <p>Klientlar:</p>
            </div>
            <div className='group_single_table pdf_margin_top_15 table_root'>
               <div className="responsive_table">
                  <div className='group_single_table_header table_header'>
                     <p>Ism</p>
                     <p>Telefon raqam</p>
                     <p>Manzil</p>
                  </div>
                  <div className="table_body">
                     {
                        group?.clients?.map((item, index) => {
                           return (
                              <div className='group_single_table_header' key={item?.id}>
                                 <p>{index + 1}. {item?.name}</p>
                                 <p>{item?.phone?.[0]}</p>
                                 <p>{item?.address}</p>
                                 <div className='group_single_table_buttons'>
                                    <button>
                                       <Link to={`/clients/${item?.id}/`}>
                                          <span className='white'>Batafsil</span>
                                       </Link>
                                    </button>
                                    {
                                       group?.activeOrders?.find(x => x?.client_id === item?.id) &&
                                       <button onClick={() => {
                                          navigate(`/orders/single/${group?.activeOrders?.find(x => x?.client_id === item?.id)?.id}`, { state: { client: true } })
                                       }}>
                                          <span className='white'>PDF</span>
                                       </button>

                                    }
                                 </div>
                              </div>
                           )
                        })
                     }
                  </div>
               </div>
            </div>
            <div className='pdf_margin_top_40'>
               <div className='submit-buttons'>
                  <Link to={`/groups/edit/${id}`}>
                     <button className='client_submit reset' type='reset'>
                        Guruhni tahrirlash
                        <AiOutlineEdit />
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </section>
   )
}

export default SingleGroup