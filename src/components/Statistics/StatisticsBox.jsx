import { memo } from "react"

export const StatisticsBox = memo(({ sum, sum1, percent, count, title, Icon, is_pros }) => {
   return (
      <div className="main-statistics_wrap">
         <div className="main-statistics_header">
            <h3 className="title">{title}</h3>
            <div className="icon_box">
               <div className="icon">
                  <Icon />
               </div>
            </div>
         </div>
         <div className="statistics_details">
            <div className="statistics_item count">
               <span className="meaning">Soni:</span>
               <span>{count} ta</span>
            </div>
            {
               is_pros ?
                  <>
                     <div className="statistics_item total_sum">
                        <span className="meaning">Kredit portfeli:</span>
                        <span>{sum}</span>
                     </div>
                     <div className="statistics_item total_sum">
                        <span className="meaning">Kredit summasi:</span>
                        <span>{sum1}</span>
                     </div>
                  </> :
                  <div className="statistics_item total_sum">
                     <span className="meaning">Summa:</span>
                     <span>{sum}</span>
                  </div>
            }
            <div className='statistics_item percent'>
               <span className="meaning">Foiz:</span>
               <span>{percent} %</span>
            </div>
         </div>
      </div>
   )
})
