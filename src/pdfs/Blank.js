import { memo } from "react"

function Blank({ order_date, user_name, boss, vvb }) {

   return (
      <div className='ijro_card'>
         <div className="sub_titles">
            <div className="sub_titles_item">
               <span>
                  Ijrochi: {user_name}
               </span>
            </div>
            <div className="sub_titles_item">
               <span>
                  Birgalikda ijro:
               </span>
               <span>
                  <article>
                     __________________
                  </article>
                  <article>
                     __________________
                  </article>
               </span>
            </div>
         </div>
         <div className="ijro_body">
            <h1 className='text_center'>
               Topshiriqning mazmuni:
            </h1>
            <div className='text_center pdf_margin_top_5'>
               O`rnatilgan tartibda tegishli ishlarni <br/> amalga oshirish uchun
            </div>
         </div>

         <div className="sub_titles">
            <div className="sub_titles_item">
               <span>
                  Muddat:
               </span>
               <span>
                  <article>
                     ______________
                  </article>
               </span>
            </div>
            <div className="sub_titles_item">
               <span>
                  Sana: {order_date}
               </span>
            </div>
         </div>
         <div className='between align_end name_handmark ijro_footer'>
            <p className='text_black_18 margin_right_20'>
               Boshqaruvchi {vvb}
            </p>
            <p className='text_black_18'>
               {boss}
            </p>
         </div>
         <div className='margin_top_5 endRow'>
            <span className='black_text'>
               <article>
                  __________________
               </article>
            </span>
         </div>
      </div>
   )
}
export default memo(Blank)