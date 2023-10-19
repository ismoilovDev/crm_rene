import { memo, useContext } from "react";
import {
   BranchFilter,
   ClearFilters,
   QueryFilter,
} from "../../components/Filter/Filter";
import { GroupFilterContext } from "../../context/context";

function Filters({ branch_id }) {
   const { filters, setFilters, initialFilters } = useContext(GroupFilterContext);

   return (
      <div className="filters">
         <h3>Filtrlar</h3>
         <div className="filter_box">
            {branch_id === 99 ? <BranchFilter filters={filters} setFilters={setFilters} /> : null}
            <QueryFilter filters={filters} setFilters={setFilters} placeholder={"Nomi yoki kodi orqali qidirish..."} />
            <ClearFilters filters={filters} setFilters={setFilters} initialFilters={initialFilters} />
         </div>
      </div>
   )
}
export default memo(Filters)