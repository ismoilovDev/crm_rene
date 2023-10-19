import { memo } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { Input, Checkbox, Tooltip } from '@nextui-org/react'
import { ClientScrollSelect } from '../MultiSelect/ClientSelect'


export const CashInputAppearence = memo(({ newData, setNewData }) => {
   return (
      <>
         <Input
            bordered
            label="SSKS / Hisobraqam"
            type='number'
            color="secondary"
            minLength={16}
            onChange={(event) => {
               setNewData({ ...newData, ssks: event.target.value })
            }}
         />
         <Input
            bordered
            clearable
            label="Bank nomi"
            color="secondary"
            onChange={(event) => {
               setNewData({ ...newData, bank_name: event.target.value })
            }}
         />
         <Input
            bordered
            label="Bank MFOsi"
            type='number'
            color="secondary"
            onChange={(event) => {
               setNewData({ ...newData, bank_code: event.target.value })
            }}
         />
      </>
   )
})

export const OpenContractsTooltip = memo(({ changeContractType, isOpenContractModal }) => {
   return (
      <div className="order_form_controls">
         <div className="controls_item">
            <Tooltip content="Shartnoma turi ochiq kredit linya asosida bo'lsa tanlab ketish." placement="topStart">
               <label htmlFor='contract'>
                  Shartnoma turi
                  <AiOutlineQuestionCircle />
               </label>
            </Tooltip>
            <Checkbox
               size='md'
               id='contract'
               isSelected={isOpenContractModal}
               color="secondary"
               onChange={changeContractType}
            >
               Ochiq kredit liniya
            </Checkbox>
         </div>
      </div>
   )
})

const AddOrderForm = ({ navigateAdd, setCode, addForm, closeForm }) => {

   return (
      <form className={addForm} onSubmit={navigateAdd}>
         <p>Mijoz ism-familyasi yoki kodi</p>
         <ClientScrollSelect
            setSelectedValue={setCode}
         />
         <div className='add_mahsulot_buttons'>
            <button onClick={closeForm} type="button">Orqaga</button>
            <button type='submit'>Qo'shish</button>
         </div>
      </form>
   )
}

export default memo(AddOrderForm);