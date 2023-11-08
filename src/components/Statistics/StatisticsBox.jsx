import { memo, useState } from "react"

export const StatisticsBox = memo(({ sum, percent, count, title, Icon, is_pros, percentage_title }) => {
   const [isActive, setIsActive] = useState(false)

   const onMouseEnter = _ => {
      setIsActive(true)
   }
   const onMouseLeave = _ => {
      setIsActive(false)
   }

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
            <div className="statistics_item total_sum">
               <span className="meaning"> {is_pros ? 'Kredit portfeli:' : 'Summa:'}</span>
               <span>{sum}</span>
            </div>
            <div
               onMouseEnter={onMouseEnter}
               onMouseLeave={onMouseLeave}
               className='statistics_item percent'
            >
               <span className="meaning">Foiz:</span>
               <span>{percent} %</span>
            </div>
         </div>
         <div className={isActive ? 'info_box active' : 'info_box'}>
            <p>{percentage_title}: </p>
            <p>{percent} %</p>
         </div>
      </div>
   )
})