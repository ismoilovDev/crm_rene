import { memo, useContext } from "react";
import {
   BranchFilter,
   ClearFilters,
   ClientMarksFilter,
   DateFilter,
   ProductFilter,
   QueryFilter,
   SectorFilter
} from "../../components/Filter/Filter";
import OrderTabs from "../../components/Order/OrderTabs";
import { OrderFilterContext } from "../../context/context";
import { ExcelButton } from "../../components/Buttons/ExcelBtn";

function Filters({ branch_id, setCurrentPage, handleOnExcel }) {
   const { filters, setFilters, initialFilters } = useContext(OrderFilterContext);
   
   return (
      <>
         <div className='shartnamaSearch'>
            <OrderTabs setCurrentPage={setCurrentPage} />
         </div>
         <div className="filters">
            <h3>Filtrlar</h3>
            <div className="filter_box">
               <QueryFilter filters={filters} setFilters={setFilters} placeholder={"Mijoz va buyurtma kodi orqali qidirish..."} />
               {+branch_id === 99 ? <BranchFilter filters={filters} setFilters={setFilters} /> : null}
               <ClientMarksFilter filters={filters} setFilters={setFilters} />
               <SectorFilter filters={filters} setFilters={setFilters} />
               <ProductFilter filters={filters} setFilters={setFilters} />
               <DateFilter filters={filters} setFilters={setFilters} />
               <ClearFilters filters={filters} setFilters={setFilters} initialFilters={initialFilters} />
            </div>
            <div className="between">
               <div className="indicator">
                  <h4>Indikator</h4>
                  <div className="reminder">
                     <span className='green'>KL yozilgan(to'ldirilgan)</span>
                     <span className='red'>KL yozilmagan(to'ldirilmagan)</span>
                  </div>
               </div>
               <ExcelButton data={handleOnExcel()} name={'Buyurtma'}/>
            </div>
         </div>
      </>
   )
}
export default memo(Filters)