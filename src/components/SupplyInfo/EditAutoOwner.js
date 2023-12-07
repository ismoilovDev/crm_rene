import { memo } from "react";
import { Input } from "@nextui-org/react"
import Select from 'react-select';

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

}

const theme = theme => ({
   ...theme,
   borderRadius: 12,
   colors: {
      ...theme.colors,
      primary25: '#7828c8',
      primary: '#7828c8',
   },
})

export const EditAutoOwner = memo(({ autoInfo, owner, setOwner, options }) => {
   return (
      <div className={(autoInfo?.possessor == 'trust_owner' || autoInfo?.possessor == 'owner') ? 'margin_top_30' : 'close'}>
         <p className='additionPart_title'>Garov mulki egasining ma'lumotlari</p>
         <div className='margin_top_10'>
            <Input
               label='Garov mulki egasining F.I.Sh.'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={owner?.fio}
               required={(autoInfo?.possessor == 'trust_owner' || autoInfo?.possessor == 'owner') ? true : false}
               onChange={(e) => {
                  const newData = { ...owner }
                  newData.fio = e.target.value
                  setOwner(newData)
               }}
            />
            <div className='transport_garovPart_selectPart margin_btn_15'>
               <p>Shaxsini tasdiqlovchi xujjat turi</p>
               <Select
                  defaultValue={options.find(x => x.label == owner?.doc_type)}
                  value={options.find(x => x.label == owner?.doc_type)}
                  options={options}
                  className='buyurtma_select_new'
                  styles={colourStyles}
                  theme={theme}
                  onChange={(event) => {
                     console.log(event)
                     const newData = { ...owner }
                     newData.doc_type = event.label
                     setOwner(newData)
                  }
                  }
               />
            </div>
            <Input
               label='Seriyasi va raqami'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={owner?.serial_num}
               required={(autoInfo?.possessor == 'trust_owner' || autoInfo?.possessor == 'owner') ? true : false}
               onChange={(e) => {
                  const newData = { ...owner }
                  newData.serial_num = e.target.value
                  setOwner(newData)
               }}
            />
            <Input
               label='Kim tomonidan berilgan'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={owner?.issued_by}
               required={(autoInfo?.possessor == 'trust_owner' || autoInfo?.possessor == 'owner') ? true : false}
               onChange={(e) => {
                  const newData = { ...owner }
                  newData.issued_by = e.target.value
                  setOwner(newData)
               }}
            />
            <Input
               label='Berilgan sana'
               type='date'
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={owner?.issued_date}
               required={(autoInfo?.possessor == 'trust_owner' || autoInfo?.possessor == 'owner') ? true : false}
               onChange={(e) => {
                  const newData = { ...owner }
                  newData.issued_date = e.target.value
                  setOwner(newData)
               }}
            />
            <Input
               label="Ro'yxat bo'yicha yashash manzili"
               clearable
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={owner?.address}
               required={(autoInfo?.possessor == 'trust_owner' || autoInfo?.possessor == 'owner') ? true : false}
               onChange={(e) => {
                  const newData = { ...owner }
                  newData.address = e.target.value
                  setOwner(newData)
               }}
            />
            <Input
               label="Telefon raqami"
               clearable
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={owner?.phone}
               required={(autoInfo?.possessor == 'trust_owner' || autoInfo?.possessor == 'owner') ? true : false}
               onChange={(e) => {
                  const newData = { ...owner }
                  newData.phone = e.target.value
                  setOwner(newData)
               }}
            />
            <Input
               label='Identifikatsiya raqami (JShShIR)'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={owner?.pinfl}
               required={(autoInfo?.possessor == 'trust_owner' || autoInfo?.possessor == 'owner') ? true : false}
               minLength={14}
               maxLength={14}
               onChange={(e) => {
                  const newData = { ...owner }
                  if (newData.pinfl.length < 14) {
                     newData.pinfl = e.target.value
                  }
                  setOwner(newData)
               }}
            />
         </div>
      </div>
   )
})

export const EditAutoTrustOwner = memo(({ autoInfo, trustOwner, setTrustOwner, options }) => {
   return (
      <div className={autoInfo?.possessor == 'trust_owner' ? 'margin_top_30' : 'close'}>
         <p className='additionPart_title'>Ishonchnoma berilgan shaxs ma'lumotlari</p>
         <div className='margin_top_10'>
            <Input
               label='F.I.Sh.'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={trustOwner?.fio}
               required={autoInfo?.possessor == 'trust_owner' ? true : false}
               onChange={(e) => {
                  const newData = { ...trustOwner }
                  newData.fio = e.target.value
                  setTrustOwner(newData)
               }}
            />
            <div className='transport_garovPart_selectPart margin_btn_15'>
               <p>Shaxsini tasdiqlovchi hujjat turi</p>
               <Select
                  defaultValue={options.find(x => x.label == trustOwner?.doc_type)}
                  value={options.find(x => x.label == trustOwner?.doc_type)}
                  options={options}
                  className='buyurtma_select_new'
                  styles={colourStyles}
                  theme={theme}
                  onChange={(event) => {
                     const newData = { ...trustOwner }
                     newData.doc_type = event.label
                     setTrustOwner(newData)
                  }}
               />
            </div>
            <Input
               label='Seriyasi va raqami'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={trustOwner?.serial_num}
               required={autoInfo?.possessor == 'trust_owner' ? true : false}
               onChange={(e) => {
                  const newData = { ...trustOwner }
                  newData.serial_num = e.target.value
                  setTrustOwner(newData)
               }}
            />
            <Input
               label='Kim tomonidan berilgan'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={trustOwner?.issued_by}
               required={autoInfo?.possessor == 'trust_owner' ? true : false}
               onChange={(e) => {
                  const newData = { ...trustOwner }
                  newData.issued_by = e.target.value
                  setTrustOwner(newData)
               }}
            />
            <Input
               label='Berilgan sana'
               type='date'
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={trustOwner?.issued_date}
               required={autoInfo?.possessor == 'trust_owner' ? true : false}
               onChange={(e) => {
                  const newData = { ...trustOwner }
                  newData.issued_date = e.target.value
                  setTrustOwner(newData)
               }}
            />
            <Input
               label="Ro'yxat bo'yicha yashash manzili"
               clearable
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={trustOwner?.address}
               required={autoInfo?.possessor == 'trust_owner' ? true : false}
               onChange={(e) => {
                  const newData = { ...trustOwner }
                  newData.address = e.target.value
                  setTrustOwner(newData)
               }}
            />
            <Input
               label='Ishonchnoma raqami'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={trustOwner?.proxy_number}
               required={autoInfo?.possessor == 'trust_owner' ? true : false}
               onChange={(e) => {
                  const newData = { ...trustOwner }
                  newData.proxy_number = e.target.value
                  setTrustOwner(newData)
               }}
            />
            <Input
               label=' Ishonchnoma berilgan sana'
               type='date'
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={trustOwner?.date}
               required={autoInfo?.possessor == 'trust_owner' ? true : false}
               onChange={(e) => {
                  const newData = { ...trustOwner }
                  newData.date = e.target.value
                  setTrustOwner(newData)
               }}
            />
            <Input
               label='Identifikatsiya raqami (JShShIR)'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='vall'
               value={trustOwner?.pinfl}
               required={autoInfo?.possessor == 'trust_owner' ? true : false}
               minLength={14}
               maxLength={14}
               onChange={(e) => {
                  const newData = { ...trustOwner }
                  if (newData.pinfl.length <= 14) {
                     newData.pinfl = e.target.value
                  }
                  setTrustOwner(newData)
               }}
            />
         </div>
      </div>
   )
})
