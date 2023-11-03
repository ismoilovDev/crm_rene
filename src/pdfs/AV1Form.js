import { useLocation } from 'react-router-dom'
import { PdfWrapper } from '../components/Pdf/Wrapper'
import dateConvert from '../utils/functions/dateConvert'
import useDataFetching from '../hooks/usePdfDataFetching'
import { PdfControls } from '../components/Pdf/PdfControls'
import { typesSupply } from '../utils/functions/supplyTypes'

function AV1Form() {
   const location = useLocation()
   const orderId = location?.state?.id
   const { data: documentInfo } = useDataFetching(`/av1/${orderId}`)

   function sugurtaProcent(months, branch) {
      if (branch == 101) {
         if (months < 13) {
            return (0.003)
         } else {
            return ((months / 12) * (0.003))
         }
      } else {
         if (months < 13) {
            return (0.01)
         } else {
            return ((months / 12) * (0.01))
         }
      }
   }

   function paymentAuto(branch_id) {
      switch (branch_id) {
         case 2: {
            return 910000
         }
         case 4: {
            return 930000
         }
         case 102: {
            return 924000
         }
         case 99: {
            return 960000
         }
         case 100: {
            return 960000
         }
         case 3: {
            return 908000
         }
         case 1: {
            return 908000
         }
         case 8: {
            return 935000
         }
         case 101: {
            return 930000
         }
         default: {
            return 950000
         }
      }
   }

   return (
      <>
         <PdfControls />
         <PdfWrapper indicator={documentInfo?.branch?.id}>
            <p className='text_black_18 text_center'>Kreditning asosiy shartlari to‘g‘risidagi axborot varaqasi</p>
            <div className='pdf_margin_top_20'>
               <div className='row_div margin between under_line'>
                  <p className='startRow div_child'>Mikromoliya tashkilotining nomi</p>
                  <p className='div_child'>Renesans Mikromoliya Tashkiloti MChJ</p>
               </div>
               <div className='row_div margin between under_line'>
                  <div className='column_div div_child'>
                     <p>Mazkur varaqa kim tomondan to'ldirilgan</p>
                     <p>(F.I.O. va Mikromoliya tashkiloti mutaxassisining lavozimi)</p>
                  </div>
                  <p className='div_child'>{documentInfo?.branch?.employee_name}</p>
               </div>
               <div className='row_div between under_line'>
                  <p className='div_child'>To‘ldirilgan sana</p>
                  <p className='div_child'>{dateConvert(documentInfo?.order?.order_date)}</p>
               </div>
               <div className='av1_form_part'>
                  <div className='row_div between margin under_line'>
                     <p className='div_child'>1. Kreditning maqsadi (turi)</p>
                     <p className='div_child'>{documentInfo?.order?.aim}</p>
                  </div>
                  <div className='row_div between margin under_line'>
                     <p className='div_child'>2. Ajratiladigan kreditning valyuta turi</p>
                     <p className='div_child'>so'm</p>
                  </div>
                  <div className='row_div between margin under_line'>
                     <p className='div_child'>3. Kreditning miqdori</p>
                     <p className='div_child'>{documentInfo?.order?.sum?.toLocaleString()} so'm</p>
                  </div>
                  <div className='row_div between margin under_line'>
                     <p className='div_child'>4. Kreditning muddati</p>
                     <p className='div_child'>{documentInfo?.order?.time} oy</p>
                  </div>
                  <div className='row_div between margin under_line'>
                     <div className='column_div'>
                        <p>5. Kreditning foiz stavkasi </p>
                        <p>(nominal miqdorda)</p>
                     </div>
                     <div className='row_div'>
                        <div className='column_div center-column marginRight'>
                           <p>{documentInfo?.order?.percent}%</p>
                           <p>(foiz ko‘rinishida)</p>
                        </div>
                        <div className='column_div center-column '>
                           <p>{documentInfo?.order?.total_interest?.toLocaleString()}</p>
                           <p>(kreditning to‘liq muddatiga pul ko‘rinishida)</p>
                        </div>
                     </div>
                  </div>
                  <div className='row_div between margin under_line'>
                     <div className='column_div startColumn div_child'>
                        <p>6. Kreditning to‘liq qiymati </p>
                        <p>(nominal foiz stavkasini va kreditga xizmat ko‘rsatish xarajatlarini o‘z ichiga oladi)</p>
                     </div>
                     <p className='div_child'>{(typesSupply(documentInfo?.supply_infos))?.includes('transport vositasi garovi') ?
                        (documentInfo?.order?.total_interest + documentInfo?.order?.sum + (/*( documentInfo?.sum_of_supply * sugurtaProcent(documentInfo?.order?.time, documentInfo?.branch?.id))*/ + paymentAuto(documentInfo?.branch?.id)))?.toLocaleString(undefined, { minimumFractionDigits: 2 })
                        :
                        (
                           (typesSupply(documentInfo?.supply_infos))?.includes('sug‘urta kompaniyasi sug‘urta polisi') ?
                              (documentInfo?.order?.total_interest + documentInfo?.order?.sum + documentInfo?.order?.sum * (sugurtaProcent(documentInfo?.order?.time, documentInfo?.branch?.id)))?.toLocaleString(undefined, { minimumFractionDigits: 2 }) :
                              (documentInfo?.order?.total_interest + documentInfo?.order?.sum)?.toLocaleString(undefined, { minimumFractionDigits: 2 })
                        )
                     } soʻm</p>
                  </div>
                  <div className='row_div between margin under_line'>
                     <div className='column_div div_child'>
                        <p>7. To‘lovlarning davriyligi</p>
                        <p>(har oyda, har chorakda va boshqalar)</p>
                     </div>
                     <p className='div_child'>oyiga bir marta</p>
                  </div>
                  <div className='row_div between margin under_line'>
                     <div className='column_div startColumn div_child'>
                        <p>8. Kreditni so‘ndirish usuli</p>
                        <p>
                           {
                              documentInfo?.order?.type_repayment == '1' ? <span>annuitet usulida (teng miqdorlarda),</span> : <span>differensial usulida(kamayib boruvchi),</span>
                           }
                        </p>
                        <p>kreditning qoldiq summasidan kamayib borish usulida va boshqalar)</p>
                     </div>
                     <p className='div_child'>{documentInfo?.order?.type_repayment == 1 ? 'Annuitet usulida (teng miqdorlarda)' : 'Differentsial usulida (kamayib boruvchi)'} </p>
                  </div>
                  <div className='row_div between margin under_line'>
                     <p className='div_child'>9. To‘lovlarning davrida bir martalik to‘lovning summasi</p>
                     <div className='column_div div_child'>
                        <p>{documentInfo?.order?.monthly_payment?.toLocaleString(undefined, { minimumFractionDigits: 2 })} soʻm</p>
                        <p>({documentInfo?.order?.type_repayment == "1" ? 'annuitet' : 'differentsial'} usulida)</p>
                     </div>
                  </div>
                  <div className='row_div between margin under_line'>
                     <p className='div_child'>10. Kredit bilan bog‘liq qo‘shimcha xarajatlar,jumladan:</p>
                     <div className='column_div center-column div_child'>
                        <p>{(typesSupply(documentInfo?.supply_infos))?.includes('transport vositasi garovi') ?
                           (/*(documentInfo?.sum_of_supply * sugurtaProcent(documentInfo?.order?.time, documentInfo?.branch?.id)) +*/ paymentAuto(documentInfo?.branch?.id))?.toLocaleString(undefined, { minimumFractionDigits: 2 })
                           :
                           (
                              (typesSupply(documentInfo?.supply_infos))?.includes('sug‘urta kompaniyasi sug‘urta polisi') ?
                                 documentInfo?.order?.sum * (sugurtaProcent(documentInfo?.order?.time, documentInfo?.branch?.id)) : 0
                           )} soʻm</p>
                        <p>(kreditning to‘liq muddatiga pul ko‘rinishida, jami)</p>
                     </div>
                  </div>
               </div>

               <div className='av1_form_part'>
                  <div className='row_div between margin under_line'>
                     <div className='column_div'>
                        <p>Turlari bo‘yicha Mikromoliya tashkilotining komissiya va</p>
                        <p>yig‘imlari (alohida ko‘rsatilsin)</p>
                     </div>
                     <div className='column_div'>
                        <p>0,00 so'm</p>
                        <p>(kreditning to‘liq muddatiga pul ko‘rinishida)</p>
                     </div>
                  </div>
                  <div className='row-div between margin under_line'>
                     <p>Uchinchi shaxslar xizmati (alohida ko‘rsatilsin)</p>
                     <p>{(typesSupply(documentInfo?.supply_infos))?.includes('transport vositasi garovi') ?
                        (/*(documentInfo?.sum_of_supply * sugurtaProcent(documentInfo?.order?.time, documentInfo?.branch?.id)) +*/ paymentAuto(documentInfo?.branch?.id))?.toLocaleString(undefined, { minimumFractionDigits: 2 })
                        :
                        (
                           (typesSupply(documentInfo?.supply_infos))?.includes('sug‘urta kompaniyasi sug‘urta polisi') ?
                              documentInfo?.order?.sum * (sugurtaProcent(documentInfo?.order?.time, documentInfo?.branch?.id)) : 0
                        )} soʻm	gacha</p>
                  </div>
                  <div className='row_div between margin under_line'>
                     <div className='row_div'>
                        <p className='marginRight'>{typesSupply(documentInfo?.supply_infos)?.join(',')}</p>
                        <div className='column-div'>
                           <p>Sug‘urta</p>
                           <p>Otsenka</p>
                           <p>Notarius</p>
                        </div>
                     </div>
                     <div className='column_div'>
                        <p>{typesSupply(documentInfo?.supply_infos)?.includes('transport vositasi garovi') ?
                           (/*documentInfo?.sum_of_supply * sugurtaProcent(documentInfo?.order?.time, documentInfo?.branch?.id)*/ 0)?.toLocaleString(undefined, { minimumFractionDigits: 2 })
                           :
                           (
                              (typesSupply(documentInfo?.supply_infos))?.includes('sug‘urta kompaniyasi sug‘urta polisi') ?
                                 documentInfo?.order?.sum * (sugurtaProcent(documentInfo?.order?.time, documentInfo?.branch?.id)) : 0
                           )} so'm gacha</p>
                        <p>0 so'm gacha</p>
                        <p>{(typesSupply(documentInfo?.supply_infos))?.includes('transport vositasi garovi') ? paymentAuto(documentInfo?.branch?.id)?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0} so'm gacha</p>
                        <p>(kreditning to‘liq muddatiga pul ko‘rinishida)</p>
                     </div>
                  </div>
               </div>

               <div className='av1_form_part margin '>
                  <div className='column_div end_table_av1'>
                     <div className='row_div between'>
                        <p>1. Kredit shartnomasi shartlari buzilshining oqibatlari</p>
                        <p>Kreditni qaytarish bo'yicha majburiyatlarning o'z vaqtida bajarilmasligi to'lov grafikidan farqli foizlar, penya va jarimalar hisoblanishiga olib kelishi oqibatida qarz yukining ortishiga, kechiktirilayotgan to'lovlar kredit tarixiga salbiy ta'sir ko'rsatishi hamda kelgusida boshqa kredit olish uchun imkoniyatlar cheklanishga oilb kelishi mumkin.</p>
                     </div>
                     <div className='row_div between margin_top_15'>
                        <p>2. Kredit bo‘yicha qarzdorlik o‘z vaqtida so‘ndirilmaganligi uchun kredit summasidan to‘lanadigan oshirilgan foiz stavkasi miqdori (agar bunday shart mavjud bo‘lsa)</p>
                        <p className='column_div'>
                           <span className='border-bottom'>
                              Majburiyatlarini shartnomada ko‘rsatilgan muddat ichida bajarmagan taqdirda qarz oluvchi kechiktirilan har bir kuni uchun belgilangan qarz miqdorining 0,4%, ammo umumiy qarz miqdorining 50%dan oshmagan miqdorida jarima to‘laydi.
                           </span>
                           <span>
                              (foiz yoki qatiy belgilangan summa ko‘rsatiladi, shuningdek neustoyka hisoblash uchun asos bo‘luvchi shartnoma shartlari keltiriladi)
                           </span>
                        </p>
                     </div>
                     <div className='row_div between'>
                        <p>3. Kreditning ta'minoti (ta'minot predmetiga qo‘yiladigan minimal talablar, garovning minimal qiymati)</p>
                        <p>{documentInfo?.sum_of_supply ? documentInfo?.sum_of_supply?.toLocaleString(undefined, { minimumFractionDigits: 2 }) : documentInfo?.order?.sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })} so'm </p>
                     </div>
                  </div>
               </div>

               <div className='av1_form_part'>
                  <div className='column-div'>
                     <p className='marginBottom black_text'>F.I.Sh.<u className='margin_left'>{documentInfo?.client?.name}</u></p>
                     <p className='black_text'>Imzo ________________________</p>
                  </div>
               </div>
            </div>
         </PdfWrapper>
      </>
   )
}
export default AV1Form