import { memo, useEffect } from 'react';
import { debounce } from 'lodash';
import { Tooltip } from '@nextui-org/react';
import { AiOutlineClear } from 'react-icons/ai';
import { useBranches } from './../../hooks/useBranches';
import { useRegions } from '../../hooks/useRegions';
import { useDistricts } from '../../hooks/useDistricts';
import { useSectors } from '../../hooks/useSectors';
import { useProducts } from '../../hooks/useProducts';
import Select from 'react-select';

const theme = (theme) => ({
   ...theme,
   borderRadius: 12,
   colors: {
      ...theme.colors,
      primary25: '#7828c8',
      primary: '#7828c8',
   },
})

const customStyles = {
   control: (baseStyles) => ({
      ...baseStyles,
      borderRadius: 2,
      padding: 1,
      fontSize: 12
   }),
   singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
   }
}

const gender_options = [
   { value: '', label: "Barchasi" },
   { value: 'male', label: "Erkak" },
   { value: 'female', label: "Ayol" }
]

const client_marks_options = [
   { value: '', label: "Barchasi" },
   { value: 'exists', label: "Kl to'ldirilgan" },
   { value: 'not_exists', label: "Kl to'ldirilmagan" }
]

export const CustomSelect = memo(({ setFilters, options, placeholder, keyer, value }) => {

   return (
      <Select
         options={options}
         styles={customStyles}
         theme={theme}
         placeholder={placeholder}
         value={value}
         onChange={event => {
            setFilters(filters => ({
               ...filters,
               [keyer]: event.value,
            }))
         }}
      />
   )
})

export const BranchFilter = memo(({ filters, setFilters }) => {
   const branches = useBranches()
   const options = [{ label: "Barcha filial", value: "" }, ...branches]
   return (
      <div className="filter_item branch_filter">
         <CustomSelect
            keyer='branch_id'
            value={options?.filter((item) => filters.branch_id === item.value)[0]}
            options={options}
            filters={filters}
            setFilters={setFilters}
            placeholder={'Filiallar...'}
         />
      </div>
   )
})

export const QueryFilter = memo(({ filters, setFilters, placeholder }) => {
   const handleChange = debounce((e) => {
      const newQuery = e.target.value;
      setFilters({ ...filters, query: newQuery });
   }, 350)
   return (
      <div className="filter_item query_filter">
         <input
            type="search"
            defaultValue={filters?.query}
            placeholder={placeholder}
            onChange={handleChange}
         />
      </div>
   )
})

export const RegionFilter = memo(({ filters, setFilters }) => {
   const regions = useRegions()
   const options = [{ label: "Barchasi", value: "" }, ...regions]

   useEffect(() => {
      setFilters(filters => ({
         ...filters,
         district_id: "",
      }));
   }, [filters?.region_id, setFilters]);

   return (
      <div className="filter_item districts_filter">
         <CustomSelect
            keyer='region_id'
            value={options?.filter((item) => filters.region_id === item.value)[0]}
            options={options}
            setFilters={setFilters}
            placeholder={'Viloyat/Respublika...'}
         />
      </div>
   )
})

export const DiscrictFilter = memo(({ filters, setFilters }) => {
   const districts = useDistricts()
   const options = [{ label: "Barchasi", value: "" }, ...districts?.filter(item => +(item?.region_id) === +filters?.region_id)];

   return (
      <div className="filter_item discrict_filter">
         <CustomSelect
            keyer='district_id'
            value={options?.filter(item => filters.district_id === item.value)[0]}
            options={options}
            setFilters={setFilters}
            placeholder={"Tuman..."}
         />
      </div>
   )
})

export const DateFilter = memo(({ filters, setFilters }) => {
   return (
      <div className="filter_item data_filter">
         <input
            type="date"
            placeholder="dan..."
            defaultValue={filters?.from}
            onChange={(e) => {
               setFilters({ ...filters, from: e.target.value });
            }}
         />
         <input
            type="date"
            placeholder="gacha..."
            defaultValue={filters?.to}
            onChange={(e) => {
               setFilters({ ...filters, to: e.target.value });
            }}
         />
      </div>
   )
})

export const GenderFilter = memo(({ filters, setFilters }) => {
   return (
      <div className="filter_item gender_filter">
         <CustomSelect
            keyer='gender'
            value={gender_options?.filter((item) => filters.gender === item.value)[0]}
            options={gender_options}
            setFilters={setFilters}
            placeholder={'Jinsi...'}
         />
      </div>
   )
})

export const ClientMarksFilter = memo(({ filters, setFilters }) => {
   return (
      <div className="filter_item cl_filter">
         <CustomSelect
            keyer='client_mark'
            value={client_marks_options?.filter((item) => filters.client_mark === item.value)[0]}
            options={client_marks_options}
            setFilters={setFilters}
            placeholder={'KL holati...'}
         />
      </div>
   )
})

export const SectorFilter = memo(({ filters, setFilters }) => {
   const sectors = useSectors()
   const options = [{ label: "Barchasi", value: "" }, ...sectors]
   const handleChange = debounce((e) => {
      setFilters({ ...filters, lifetime: e.target.value });
   }, 350)

   return (
      <>
         <div className="filter_item sector_filter">
            <CustomSelect
               keyer='sector_id'
               value={options?.filter((item) => filters.sector_id === item.value)[0]}
               options={options}
               setFilters={setFilters}
               placeholder={'Maqsadi bo\'yicha...'}
            />
         </div>
         <div className="filter_item lifetime_filter">
            <input
               type="number"
               placeholder="Kredit davomiyligi bo'yicha (oyda)..."
               onChange={handleChange}
            />
         </div>
      </>
   )
})

export const ProductFilter = memo(({ filters, setFilters }) => {
   const products = useProducts()
   const options = [{ label: "Barchasi", value: "" }, ...products]
   return (
      <div className="filter_item">
         <CustomSelect
            keyer='product_id'
            value={options?.filter((item) => filters.product_id === item.value)[0]}
            options={options}
            setFilters={setFilters}
            placeholder={'Mahsulot bo\'yicha...'}
         />
      </div>
   )
})

export const ClearFilters = memo(({ filters, setFilters, initialFilters }) => {
   return (
      <Tooltip content={"Filterni tozalash"} placement="topStart">
         <button className="clear_filter" onClick={() => setFilters({ ...initialFilters, order_by: filters?.order_by })}>
            <AiOutlineClear />
         </button>
      </Tooltip>
   )
})