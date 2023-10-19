import { memo, useContext } from "react";
import {
   ClearFilters,
   DateFilter,
   DiscrictFilter,
   GenderFilter,
   QueryFilter,
   RegionFilter,
} from "../../components/Filter/Filter";
import { ClientFilterContext } from "../../context/context";

function Filters() {
   const { filters, setFilters, initialFilters } = useContext(ClientFilterContext);

   return (
      <div className="filters">
         <h3>Filtrlar</h3>
         <div className="filter_box">
            <QueryFilter filters={filters} setFilters={setFilters} placeholder={"Ism, kod va pinfl orqali qidirish..."} />
            <RegionFilter filters={filters} setFilters={setFilters} />
            <DiscrictFilter filters={filters} setFilters={setFilters} />
            <GenderFilter filters={filters} setFilters={setFilters} />
            <DateFilter filters={filters} setFilters={setFilters} />
            <ClearFilters filters={filters} setFilters={setFilters} initialFilters={initialFilters} />
         </div>
      </div>
   )
}
export default memo(Filters)