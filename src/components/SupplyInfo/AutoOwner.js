import { memo } from 'react';
import { Input } from '@nextui-org/react';
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

const theme = (theme) => ({
   ...theme,
   borderRadius: 12,
   colors: {
      ...theme.colors,
      primary25: '#7828c8',
      primary: '#7828c8',
   },
})

export const AutoOwner = memo(({ firstTable, register, options, setOwnerSelector, ownerStatus }) => {
   return (
      <div className={firstTable}>
         <p className='additionPart_title'>Garov mulki egasining ma'lumotlari</p>
         <div>
            <Input
               label='Garov mulki egasining F.I.Sh.'
               placeholder=' Muxammadshukurov Xusniddin Fatxulla o`g`li'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='transport_garovPart_input'
               {...register(`owner.fio`, { required: ownerStatus })}
            />
            <div className='transport_garovPart_selectPart margin_btn_15'>
               <p>Shaxsini tasdiqlovchi xujjat turi</p>
               <Select
                  defaultValue={options[0]}
                  options={options}
                  className='buyurtma_select_new'
                  styles={colourStyles}
                  theme={theme}
                  onChange={(event) => setOwnerSelector(event.label)}
               />
            </div>
            <Input
               label='Seriyasi va raqami'
               placeholder='AA 87654321'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='transport_garovPart_input'
               {...register(`owner.serial_num`, { required: ownerStatus })}
            />
            <Input
               label='Kim tomonidan berilgan'
               clearable
               placeholder='Toshkent viloyati Bo`ka tumani Mudofa '
               width='100%'
               color="secondary"
               bordered
               className='transport_garovPart_input'
               {...register(`owner.issued_by`, { required: ownerStatus })}
            />
            <Input
               label='Berilgan sana'
               type='date'
               width='100%'
               color="secondary"
               bordered
               className='transport_garovPart_input'
               {...register(`owner.issued_date`, { required: ownerStatus })}
            />
            <Input
               label="Ro'yxat bo'yicha yashash manzili"
               clearable
               placeholder='Toshkent viloyati Bo`ka tumani Y.Xojimetov fu O`zbekiston ko`chasi 92 uy'
               width='100%'
               color="secondary"
               bordered
               className='transport_garovPart_input'
               {...register(`owner.address`, { required: ownerStatus })}
            />
            <Input
               label="Telefon raqami"
               clearable
               placeholder='909900909'
               labelLeft='+998'
               width='100%'
               color="secondary"
               bordered
               className='transport_garovPart_input'
               {...register(`owner.phone`, { required: ownerStatus })}
            />
            <Input
               label='Identifikatsiya raqami (JShShIR)'
               placeholder='123456789'
               clearable
               width='100%'
               color="secondary"
               bordered
               type='number'
               onWheel={(e) => e.target.blur()}
               className='transport_garovPart_input'
               {...register(`owner.pinfl`, { required: ownerStatus, minLength: 14 })}
            />
         </div>
      </div>
   )
})


export const AutoTrustOwner = memo(({ secondTable, register, options, setTrustOwnerSelector, trustOwnerStatus }) => {
   return (
      <div className={secondTable}>
         <p className='additionPart_title'>Ishonchnoma berilgan shaxs ma'lumotlari</p>
         <div>
            <Input
               label='F.I.Sh.'
               placeholder='Maxkamova Kimdir Kimsanovna'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='transport_ishonchnomaPart_input'
               {...register(`trust_owner.fio`, { required: trustOwnerStatus })}
            />
            <div className='transport_garovPart_selectPart margin_btn_15'>
               <p>Shaxsini tasdiqlovchi hujjat turi</p>
               <Select
                  defaultValue={options[0]}
                  options={options}
                  className='buyurtma_select_new'
                  styles={colourStyles}
                  theme={theme}
                  onChange={(event) => { setTrustOwnerSelector(event.label) }}
               />
            </div>
            <Input
               label='Seriyasi va raqami'
               placeholder='AA 87654321'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='transport_ishonchnomaPart_input'
               {...register(`trust_owner.serial_num`, { required: trustOwnerStatus })}
            />
            <Input
               label='Kim tomonidan berilgan'
               clearable
               placeholder='Toshkent viloyati Bo`ka tumani Mudofa '
               width='100%'
               color="secondary"
               bordered
               className='transport_ishonchnomaPart_input'
               {...register(`trust_owner.issued_by`, { required: trustOwnerStatus })}
            />
            <Input
               label='Berilgan sana'
               type='date'
               width='100%'
               color="secondary"
               bordered
               className='transport_ishonchnomaPart_input'
               {...register(`trust_owner.issued_date`, { required: trustOwnerStatus })}
            />
            <Input
               label="Ro'yxat bo'yicha yashash manzili"
               clearable
               placeholder='Toshkent viloyati Bo`ka tumani Y.Xojimetov fu O`zbekiston ko`chasi 92 uy'
               width='100%'
               color="secondary"
               bordered
               className='transport_ishonchnomaPart_input'
               {...register(`trust_owner.address`, { required: trustOwnerStatus })}
            />
            <Input
               label='Ishonchnoma raqami'
               placeholder='123456789'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='transport_ishonchnomaPart_input'
               {...register(`trust_owner.proxy_number`, { required: trustOwnerStatus })}
            />
            <Input
               label=' Ishonchnoma berilgan sana'
               type='date'
               width='100%'
               color="secondary"
               bordered
               className='transport_ishonchnomaPart_input'
               {...register(`trust_owner.date`, { required: trustOwnerStatus })}
            />
            <Input
               label='Identifikatsiya raqami (JShShIR)'
               clearable
               width='100%'
               color="secondary"
               bordered
               className='transport_ishonchnomaPart_input'
               type='number'
               onWheel={(e) => e.target.blur()}
               {...register(`trust_owner.pinfl`, { required: trustOwnerStatus, minLength: 14 })}
            />
         </div>
      </div>
   )
})