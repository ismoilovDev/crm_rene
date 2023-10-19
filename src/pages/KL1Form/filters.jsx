import { memo, useContext } from "react";
import {
   BranchFilter,
   ClearFilters,
   DateFilter,
   QueryFilter,
} from "../../components/Filter/Filter";
import { ClientMarksFilterContext } from "../../context/context";

function Filters({ branch_id }) {
   const { filters, setFilters, initialFilters } = useContext(ClientMarksFilterContext);

   return (
      <div className="filters">
         <h3>Filtrlar</h3>
         <div className="filter_box">
            <QueryFilter filters={filters} setFilters={setFilters} placeholder={"Mijoz f.i.sh va kodi orqali qidirish..."} />
            {branch_id === 99 ? <BranchFilter filters={filters} setFilters={setFilters} /> : null}
            <DateFilter filters={filters} setFilters={setFilters} />
            <ClearFilters filters={filters} setFilters={setFilters} initialFilters={initialFilters} />
         </div>
      </div>
   )
}
export default memo(Filters)