import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Checkbox, Radio } from '@nextui-org/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { InputSingle } from '../../../components/Input/InputSingle';
import { translateType } from '../../../components/Order/Functions';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';


function OrderSingle() {
   let { id } = useParams()
   let navigate = useNavigate()
   const [order, setOrder] = useState({});

   useEffect(() => {
      https
         .get(`/orders/${id}`)
         .then(res => {
            setOrder(res?.data)
            console.log(res?.data)
         })
         .catch(err => {
            console.log(err);
         })
   }, [id])

   const supplyTypes = useMemo(() => {
      return order.supply_info ? order.supply_info.map(item => item.type) : [];
   }, [order.supply_info]);


   const navigateTo = useCallback((page) => {
      navigate(`/pdf/${page}`, { state: { id } });
   }, [id, navigate]);

   const dataSort = useCallback((data) => {
      switch (data) {
         case "accepted":
            return "tasdiqlangan";
         case "denied":
            return "rad etilgan";
         case "pending":
            return "kutilmoqda";
         default:
            return 'unknown';
      }
   }, []);

   const renderButton = (condition, label, page) => {
      return condition && (
         <button className="page_button" onClick={() => navigateTo(page)}>
            {label}
         </button>
      );
   };

   return (
      <>
         <div className='buyurtma_topPart'>
            <Prev />
            <div className='buyurtma_page_buttons'>
               {renderButton(true, 'B1', 'b1')}
               {renderButton(true, 'Av', 'av1')}
               {renderButton(supplyTypes.includes('auto'), 'B3', 'b3')}
               {renderButton(supplyTypes.includes('guarrantor'), 'B4', 'b4')}
               {renderButton(true, 'P1', 'p1')}
               {renderButton(order.sign_committee, 'P2', 'p2')}
               {renderButton(order.status === 'denied', 'X1', 'x1')}
               {order.contract?.contract_num && (
                  <>
                     {renderButton(true, 'S1', 's1')}
                     {renderButton(true, 'G1', 'g1')}
                     {renderButton(order.group?.id, 'K1', 'k1')}
                     {renderButton(supplyTypes.includes('guarrantor'), 'K2', 'k2')}
                     {(supplyTypes.includes('auto') || supplyTypes.includes('gold')) && (
                        <>
                           {renderButton(true, 'GS', 'gs1')}
                           {renderButton(true, 'KD', 'kd2')}
                        </>
                     )}
                     {supplyTypes.includes('gold') && (
                        <>
                           {renderButton(true, 'QD', 'qd')}
                           {renderButton(true, 'TD', 'td')}
                        </>
                     )}
                     {supplyTypes.includes('auto') && (
                        <>
                           {renderButton(true, 'NI', 'ni')}
                           {renderButton(true, 'DL', 'dl')}
                        </>
                     )}
                  </>
               )}
               {order.open_contract && (
                  <>
                     {renderButton(true, 'B5', 'b5')}
                     {renderButton(true, 'P3', 'p3')}
                     {renderButton(true, 'BK', 'contract')}
                  </>
               )}
            </div>
         </div>

         <section className='single_buyurtma'>
            <div className='single_buyurtma_info'>
               <p className='single_buyurtma_title'>
                  <Link to={`/clients/${order?.client?.id}/`}>
                     {order?.client?.name}
                  </Link>
               </p>
               <div className='shart-check'>
                  <Checkbox
                     size='sm'
                     className='margin_bottom'
                     color="secondary"
                     isReadOnly
                     isSelected={order?.open_contract ? true : false}
                  >
                     Ochiq kredit liniya
                  </Checkbox>
               </div>
               <div className='shart-check'>
                  <Checkbox
                     value="Kredit Qo'mitasi qorariga asosan"
                     size='sm'
                     className='margin_bottom'
                     color="secondary"
                     isReadOnly
                     isSelected={order?.sign_committee}
                  >
                     Kredit Qo'mitasi qorariga asosan
                  </Checkbox>
               </div>
               <InputSingle label={"Status:"} value={dataSort(order?.status)} />
               <InputSingle label={"Zayavka raqami:"} value={order?.order_number} />
               <InputSingle label={"Code:"} value={order?.code} />
               <div className='shart-selector'>
                  <p>Kredit ajratish tartibi</p>
                  <div className='margin_top_10'>
                     <Radio.Group
                        orientation="horizontal"
                        size='sm'
                        label=' '
                        defaultValue={order?.type_credit}
                        value={order?.type_credit}
                     >
                        <Radio orientation="horizontal" value={"card"}>Plastik karta / Hisobraqam</Radio>
                        <Radio orientation="horizontal" value={"cash"}>Naqd pul ko'rinishida</Radio>
                     </Radio.Group>
                  </div>
               </div>
               <InputSingle label={"Buyurtma sanasi:"} value={order?.order_date} />
               <InputSingle label={"So'ralayotgan qarz miqdor:"} value={`${order?.sum?.toLocaleString()} som`} />
               <InputSingle label={"So'ralayotgan muddat (oy):"} value={order?.time} />
               <InputSingle label={"Mahsulot:"} value={order?.product?.name} />
               <InputSingle label={"Sector:"} value={order?.sector?.name} />
               <InputSingle label={"Maqsadi:"} value={order?.aim} />
               <InputSingle label={"Ustama foiz stavkasi, yillik:"} value={`${order?.percent_year} %`} />
               <InputSingle label={"Penya, kunlik:"} value={`${order?.daily_fine} %`} />
               <InputSingle label={"Oylik komission yig'im:"} value={`${order?.monthly_commission} %`} />
               <div className='shart-selector'>
                  <p>So'ndirish tartibi</p>
                  <div className='margin_top_10'>
                     <Radio.Group
                        size='sm'
                        defaultValue={order?.type_repayment == 1 ? 1 : 2}
                        value={order?.type_repayment == 1 ? 1 : 2}
                        className='shart-selector-group'
                        label=' '
                     >
                        <Radio value={1}>Bir qil miqdor(Annuitet)</Radio>
                        <Radio value={2}>Kamayib boruvshi(differensial)</Radio>
                     </Radio.Group>
                  </div>
               </div>
               <InputSingle label={"Oylik o'rtacha daromad:"} value={`${order?.salary?.toLocaleString()} som`} />
               {
                  order?.group?.id ?
                     <InputSingle label={"Guruh:"} value={order?.group?.name} /> : <></>
               }
               {
                  order?.bank_name ?
                     <>
                        <InputSingle label={"SSKS / Hisobraqam:"} value={order?.ssks} />
                        <InputSingle label={"Bank nomi:"} value={order?.bank_name} />
                        <InputSingle label={"Bank MFOsi:"} value={order?.bank_code} />
                     </> : <></>
               }
               <InputSingle label={"Taminot:"} value={
                  order?.supply_info?.[0] ?
                     `${translateType(order?.supply_info?.[0]?.type)} ${order?.supply_info?.[0]?.type === 'gold' || order?.supply_info?.[0]?.type === 'auto' ?
                        ` --- ${order?.supply_info?.[0]?.sum?.toLocaleString()}` : ''
                     }`
                     : "Taminot hali qo'shilmagan"
               } />
               {
                  order?.protocol?.code ?
                     <>
                        <InputSingle label={"Buyurtma protokol raqami:"} value={order?.protocol?.code} />
                        <InputSingle label={"Buyurtma protokol raqam sanasi:"} value={order?.protocol_result_date} />
                     </> : <></>
               }
            </div>
         </section>
      </>
   )
}

export default memo(OrderSingle)