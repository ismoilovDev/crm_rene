import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { List } from 'react-content-loader'
import ContainerView from '../../../components/ImageContainer/ContainerView';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';


function SingleGold() {
   const { id } = useParams()
   const [loading, setLoading] = useState(true)
   const [goldInfo, setGoldInfo] = useState({})
   const [path, setPath] = useState([])

   const getData = async() =>{
      try{
         const res = await https.get(`/supply-info/${id}`)
         const { data } = res;
         setGoldInfo(data)
         setPath(data?.images)
         setLoading(false)
         console.log(data);
      }
      catch(err){
         console.log(err);
      }
   }

   useEffect(() => {
      getData()
   }, [id])

   function totalSum() {
      let sum = []
      goldInfo?.gold?.map(item => {
         sum.push(item?.sum)
      })

      let total = sum.reduce((prev, current) => prev + current, 0)
      return total.toLocaleString(undefined, { minimumFractionDigits: 2 })
   }

   function getTotal(array, field){
      const total = array?.reduce((sum, item)=> sum + (item?.[field] || 0), 0);
      return total;
   }

   function goldProbaList(goldInfo){
      if(!goldInfo?.gold) return []

      const goldMap = goldInfo.gold.reduce((map, item)=>{
         const goldNum = item?.gold_num

         if(goldNum !== undefined){
            if(!map.has(goldNum)){
               map.set(goldNum, { gold_num: goldNum, items:[]})
            }
            map.get(goldNum).items.push(item)
         }
         return map;
      }, new Map())

      return Array.from(goldMap.values());
   }

   return (
      <section>
         <div className='filialform_header'>
            <Prev />
         </div>
         <div className=' single_buyurtma'>
            {
               loading ? (
                  <div className='margin_top_30'>
                     <List />
                  </div>
               ) : (
                  <>
                     <h1 className='text_center filial_edit_text'>{goldInfo?.order?.client?.name}</h1>
                     <div className='pdf_margin_top_15'>
                        <div className='single_buyurtma_info'>
                           <div className='single_buyurtma_inputs'>
                              <p>Ta'minot turi:</p>
                              <p>Tilla Buyumlar Garovi</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p></p>
                              <p>{goldInfo?.valued_by == 1 ? "O'zaro kelishuvga asosan" : "Mustaqil Baholash Asosida"}</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Baholash hujjati sanasi:</p>
                              <p>{goldInfo?.date}</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Qabul qilish qiymati, %da:</p>
                              <p>{goldInfo?.percent}</p>
                           </div>
                           <div className='single_buyurtma_inputs'>
                              <p>Qabul qilish qiymati, somda:</p>
                              <p>{goldInfo?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                           </div>
                           <div className={goldInfo?.company ? 'margin_top_30' : 'margin_top_30 close'}>
                              <div className='single_buyurtma_inputs'>
                                 <p>Tilla buyumlarni baholovchi tashkilot:</p>
                                 <p>{goldInfo?.company?.name}</p>
                              </div>
                              <div className='single_buyurtma_inputs'>
                                 <p>Litsenziya:</p>
                                 <p>{goldInfo?.company?.license}</p>
                              </div>
                              <div className='single_buyurtma_inputs'>
                                 <p>Baholovchining ismi sharifi:</p>
                                 <p>{goldInfo?.company?.valuer_name}</p>
                              </div>
                              <div className='single_buyurtma_inputs'>
                                 <p>Baholash hujjati raqami:</p>
                                 <p>{goldInfo?.company?.doc_code}</p>
                              </div>
                           </div>
                           {/* Table */}
                           <div className='margin_top_30'>
                              <table className='single_table'>
                                 <thead>
                                    <tr>
                                       <td>№</td>
                                       <td>Nomi</td>
                                       <td>Proba</td>
                                       <td>Birlik</td>
                                       <td>Soni</td>
                                       <td>Umumiy og`irligi(gr)</td>
                                       <td>Toshlari og`irligi(gr)</td>
                                       <td>Sof og`irligi(gr)</td>
                                       <td>Gramm uchun narx(so`m)</td>
                                       <td>Baholangan qiymati(som)</td>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {
                                       goldInfo?.gold?.map((item, index) => {
                                          return (
                                             <tr key={item?.id}>
                                                <td>{index + 1}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.gold_num}</td>
                                                <td>{item?.measure}</td>
                                                <td>{item?.quantity}</td>
                                                <td>{item?.weight}</td>
                                                <td>{item?.stone_weight?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                <td>{item?.clean_weight?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                <td>{item?.gold_num_sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                <td>{item?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                             </tr>
                                          )
                                       })
                                    }
                                 </tbody>
                                 <tfoot>
                                    <tr>
                                       <td></td>
                                       <td></td>
                                       <td></td>
                                       <td></td>
                                       <td><p className='black_text'>{getTotal(goldInfo?.gold, 'quantity')}</p></td>
                                       <td><p className='black_text'>{getTotal(goldInfo?.gold, 'weight')?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p></td>
                                       <td><p className='black_text'>{getTotal(goldInfo?.gold, 'stone_weight')?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p></td>
                                       <td><p className='black_text'>{getTotal(goldInfo?.gold, 'clean_weight')?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p></td>
                                       <td></td>
                                       <td><h3 className=''>{getTotal(goldInfo?.gold, 'sum')?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3></td>
                                    </tr>
                                 </tfoot>
                              </table>
                           </div>

                           <p className='black_text margin_top_15'>Proba Jadval</p>
                           <table className='single_table margin_top_15'>
                              <thead>
                                 <tr>
                                    <td>Proba</td>
                                    <td>Soni</td>
                                    <td>Umumiy og`irligi(gr)</td>
                                    <td>Toshlari og`irligi(gr)</td>
                                    <td>Sof og`irligi(gr)</td>
                                    <td>Gramm uchun narx(so`m)</td>
                                    <td>Baholangan qiymati(som)</td>
                                 </tr>
                              </thead>
                              <tbody>
                                 {
                                    goldProbaList(goldInfo)?.map((item, index)=>(
                                       <tr>
                                          <td><h3>{item?.gold_num}</h3></td>
                                          <td>{getTotal(item?.items, 'quantity')}</td>
                                          <td>{getTotal(item?.items, 'weight')?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                          <td>{getTotal(item?.items, 'stone_weight')?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                          <td>{getTotal(item?.items, 'clean_weight')?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                          <td>{item?.items?.[0]?.gold_num_sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                          <td>{getTotal(item?.items, 'sum')?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                       </tr>
                                    ))
                                 }
                              </tbody>
                           </table>

                           <p className='margin_top_15'></p>
                           <ContainerView paths={path} />
                        </div>
                     </div>
                  </>
               )
            }
         </div>
      </section>
   )
}

export default SingleGold