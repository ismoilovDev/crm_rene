import { memo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import Prev from '../../../components/Prev/Prev';
import WithoutSupplyInfo from './confidenced';
import Insurance from './insurance';
import Transport from './transport';
import GoldSupply from './gold';
import Owner from './owner';

const colourStyles = {
   control: styles => ({ ...styles, backgroundColor: 'white' }),
   option: (styles, { isDisabled, isSelected }) => {
      return {
         ...styles,
         backgroundColor: isSelected ? 'rgb(215,215,215)' : 'white',
         color: 'black',
         margin: '0 5px',
         width: 'cal(100% - 10px)',
         fontWeight: 500,
         borderRadius: '5px',
         border: isSelected ? '2px solid rgb(215,215,215)' : '2px solid white',
         cursor: isDisabled ? 'not-allowed' : 'default',
         "&:hover": {
            border: '2px solid rgb(215,215,215)'
         }
      };
   },
};

const options = [
   { value: 1, label: "Tilla buyumlar" },
   { value: 2, label: "Transport vositasi garovi" },
   { value: 3, label: "3-shaxs kafilligi" },
   { value: 4, label: "Sugurta kompaniyasi sugurta polisi" },
   { value: 5, label: "Ishonch asosida" }
];

const theme = (theme) => ({
   ...theme,
   colors: {
      ...theme.colors,
      borderRadius: '10px',
      primary25: 'rgb(216,215,215)',
      primary: '#7828c8',
   },
})

const SupplyType = memo(({ selectedSector, clientId }) => {
   return (
      selectedSector === 1 ? <GoldSupply type={selectedSector} clientId={clientId} /> :
         selectedSector === 2 ? <Transport type={selectedSector} clientId={clientId} /> :
            selectedSector === 3 ? <Owner type={selectedSector} clientId={clientId} /> :
               selectedSector === 4 ? <Insurance type={selectedSector} clientId={clientId} /> :
                  selectedSector === 5 ? <WithoutSupplyInfo type={selectedSector} clientId={clientId} /> : null

   )
})

function SupplyInfoForm() {
   const location = useLocation()
   const clientId = location?.state?.id
   const [selectedSector, setSelectedSector] = useState(1)

   return (
      <section>
         <Prev />
         <div className='taminot_tableform margin_top_15'>
            <div className='taminot_table'>
               <div className='rare'>
                  <p>Taminot turi</p>
                  <Select
                     width='100%'
                     onChange={e => setSelectedSector(e.value)}
                     defaultValue={options[0]}
                     options={options}
                     className='buyurtma_select_taminot'
                     styles={colourStyles}
                     theme={theme}
                  />
               </div>
               <SupplyType selectedSector={selectedSector} clientId={clientId} />
            </div>
         </div>
      </section>
   )
}

export default SupplyInfoForm