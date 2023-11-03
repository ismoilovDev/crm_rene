import { memo } from "react";
import Select from 'react-select';
import { Input } from "@nextui-org/react";
import { BiTrash } from "react-icons/bi";
import { NumericFormat } from "react-number-format";
import { makeTheme, customStyles } from "../Order/Functions";
import { gold_standarts, gold_names } from "./standarts";
import './style.scss'

export const GoldTable = memo(({ bahoItems, setBahoItems, deletePoint, addNewPoint, precisionRound }) => {
   return (
      <div className='tamilot_main_table'>
         <h1>Baholash natijalari</h1>
         {
            bahoItems?.map((item, index) => (
               <div className='taminot_tableform_item' key={item?.id}>
                  <div className='taminot_tableform_title'>
                     <h2>Mahsulot №{index + 1}</h2>
                     <button
                        className='taminot_tableform_delete taminot_tableform_delete_active'
                        onClick={() => deletePoint(item?.id)}
                        type='button'
                     >
                        <BiTrash />
                     </button>
                  </div>
                  <div className='taminot_gold_product'>
                     <div className='order-select'>
                        <p>Nomi</p>
                        <Select
                           value={gold_names?.find(x => x?.label === item?.name)}
                           defaultValue={gold_names?.find(x => x?.label === item?.name)}
                           options={gold_names}
                           className='buyurtma_select_new group_selector'
                           styles={customStyles}
                           theme={makeTheme}
                           onChange={(event) => {
                              const newGold = [...bahoItems]
                              newGold[index].name = event.label
                              newGold[index].measure = gold_standarts?.find(x => x?.id === event?.value)?.unit
                              setBahoItems(newGold)
                           }}
                        />
                     </div>
                     <Input
                        bordered
                        label='Proba'
                        className='taminot_tableform_input'
                        clearable
                        placeholder="583"
                        type='number'
                        onWheel={(e) => e.target.blur()}
                        color="secondary"
                        value={bahoItems.find(x => x.id === item.id).gold_num}
                        onChange={(e) => {
                           const newGold = [...bahoItems]
                           newGold[index].gold_num = e.target.value
                           setBahoItems(newGold)
                        }}
                     />
                     <Input
                        bordered
                        label="O'lchov birligi"
                        className='taminot_tableform_input'
                        color="secondary"
                        value={bahoItems.find(x => x.id === item.id).measure}
                        onChange={(e) => {
                           const newGold = [...bahoItems]
                           newGold[index].measure = e.target.value
                           setBahoItems(newGold)
                        }}
                        clearable
                     />
                     <Input
                        bordered
                        type='number'
                        onWheel={(e) => e.target.blur()}
                        label='Soni'
                        className='taminot_tableform_input'
                        placeholder="1"
                        color="secondary"
                        value={bahoItems.find(x => x.id === item.id).quantity}
                        onChange={(e) => {
                           const newGold = [...bahoItems]
                           newGold[index].quantity = e.target.value
                           setBahoItems(newGold)
                        }}
                        clearable
                     />
                     <div className="input_warning_container">
                        <Input
                           bordered
                           type='number'
                           onWheel={(e) => e.target.blur()}
                           label='Umumiy og`irligi(gr)'
                           placeholder="1"
                           min="0"
                           step=".01"
                           color="secondary"
                           status={bahoItems?.find(x => x?.id === item?.id)?.weight > gold_standarts?.find(x => x?.name === bahoItems?.find(x => x?.id === item?.id)?.name)?.max_weight ? 'warning' : ''}
                           value={bahoItems?.find(x => x?.id === item?.id)?.weight}
                           onChange={(e) => {
                              const newGold = [...bahoItems]
                              newGold[index].weight = e.target.value
                              newGold[index].clean_weight = e.target.value - newGold[index].stone_weight
                              newGold[index].sum = (e.target.value - newGold[index].stone_weight) * newGold[index].gold_num_sum
                              setBahoItems(newGold)
                           }}
                           clearable
                        />
                        <span className={bahoItems?.find(x => x?.id === item?.id)?.weight > gold_standarts?.find(x => x?.name === bahoItems?.find(x => x?.id === item?.id)?.name)?.max_weight ? "warning_text" : "none"}>Og'irligi odatdagidan og'irroq!!!</span>
                     </div>
                     <Input
                        bordered
                        type='number'
                        onWheel={(e) => e.target.blur()}
                        label='Toshlari og`irligi(gr)'
                        className='taminot_tableform_input'
                        placeholder="1"
                        min="0"
                        step=".01"
                        color="secondary"
                        value={bahoItems.find(x => x.id === item.id).stone_weight}
                        onChange={(e) => {
                           const newGold = [...bahoItems]
                           newGold[index].stone_weight = e.target.value
                           newGold[index].clean_weight = newGold[index].weight - e.target.value
                           newGold[index].sum = (newGold[index].weight - e.target.value) * newGold[index].gold_num_sum
                           setBahoItems(newGold)
                        }}
                        clearable
                     />
                     <Input
                        bordered
                        onWheel={(e) => e.target.blur()}
                        label='Sof og`irligi(gr)'
                        min="0"
                        step=".01"
                        className='taminot_tableform_input'
                        placeholder="1"
                        color="secondary"
                        readOnly
                        value={precisionRound(bahoItems.find(x => x.id === item.id).clean_weight, 2)}
                     />
                     <div className="numeric_format_input without_margin width_100 border_radius_10 taminot_tableform_input">
                        <label>Gramm uchun narx(so`m)</label>
                        <NumericFormat
                           thousandSeparator={' '}
                           value={bahoItems?.find(x => x?.id === item?.id)?.gold_num_sum}
                           onChange={(e)=>{
                              const changed_number = Number((e.target.value).replace(/\s/g, ''))
                              const newGold = [...bahoItems]
                              newGold[index].gold_num_sum = changed_number
                              newGold[index].sum = changed_number * newGold[index].clean_weight
                              setBahoItems(newGold)
                           }}
                        />
                     </div>
                     <Input
                        bordered
                        type='text'
                        label="Baholangan qiymati(so'm)"
                        className='taminot_tableform_input'
                        placeholder="1"
                        color="secondary"
                        readOnly
                        value={bahoItems.find(x => x.id === item.id).sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                     />
                  </div>
               </div>
            ))
         }
         <div className='transport_product_addPlace'>
            <button type='button' className='transport_product_addButton' onClick={(event) => addNewPoint(event)}>
               <i className='bx bx-plus-circle'></i>
            </button>
         </div>
      </div>
   )
})