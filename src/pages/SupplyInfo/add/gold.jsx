import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Input, Radio } from '@nextui-org/react';
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai';
import https from '../../../services/https';
import { alert } from '../../../components/Alert/alert';
import Container from '../../../components/ImageContainer/Container'
import precisionRound from '../../../utils/functions/precisionRound'
import { GoldTable } from '../../../components/SupplyInfo/GoldTable';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import { IndependentGoldSupply } from '../../../components/SupplyInfo/SupplyInfo';

const defaultItems = [
   {
      id: uuidv4(),
      name: '',
      gold_num: 0,
      measure: '',
      quantity: 0,
      weight: 0,
      stone_weight: 0,
      clean_weight: 0,
      gold_num_sum: 0,
      sum: 0
   }
]

function GoldSupply({ clientId }) {

   const [path, setPath] = useState([])
   const [bahoType, setBahoType] = useState(1)
   const [disable, setDisable] = useState(false)
   const [addStatus, setAddStatus] = useState(false)
   const [bahoItems, setBahoItems] = useState([{
      id: 1,
      name: '',
      gold_num: 0,
      measure: '',
      quantity: 0,
      weight: 0,
      stone_weight: 0,
      clean_weight: 0,
      gold_num_sum: 0,
      sum: 0
   }])
   const [date, setDate] = useState('')
   const navigate = useNavigate()
   const { register, handleSubmit } = useForm();

   function addNewPoint() {
      setBahoItems([...bahoItems, {
         id: uuidv4(),
         name: '',
         gold_num: 0,
         measure: '',
         quantity: 0,
         weight: 0,
         stone_weight: 0,
         clean_weight: 0,
         gold_num_sum: 0,
         sum: 0
      }]);
   }

   function deletePoint(id) {
      if (bahoItems.length > 1) {
         const updatedItems = bahoItems.filter(item => item.id !== id);
         setBahoItems(updatedItems);
      }
   }

   function totalSum() {
      return +bahoItems.reduce((total, item) => Number(total) + (Number(item.sum) || 0), 0);
   }

   const mainRequest = async (post_data) => {
      const { data } = await https.post(`/supply-info`, post_data);
      return data.id
   }
   

   const onSubmit = async (data) => {
      if(path.length == 0) return alert(`Rasm kiriting!`, 'error')
      
      setDisable(true);
      const total = totalSum()
      const gold = bahoItems.map(({ id, ...item }) => item)

      const main_data = {
         client_id: clientId,
         type: 'gold',
         possessor: 'client', 
         valued_by: bahoType,
         date,
         sum: Number(total),
         paths: path,
         percent: 100,
         gold
      }

      if(addStatus){
         Object.assign(main_data, {company: data.company})
      }

      try {
         const res = await mainRequest(main_data)
         alert("Ta'minot qo'shildi", 'success');
         navigate(-1)
      } catch (err) {
         alert(`Xatolik: ${err.message}`, 'error')
         setDisable(false)
      } finally {
         setDisable(false)
      }
   };


   return (
      <>
         <form className='taminot_form' onSubmit={(handleSubmit(onSubmit))}>
            <div className='taminot_ratio_parent taminot_tilla_radio'>
               <Radio.Group label=' ' color='secondary' orientation="horizontal" defaultValue={1} size='sm' className='taminot_ratio'
                  onChange={(event) => {
                     setBahoType(event)
                     if (event === 2) {
                        setAddStatus(true)
                     } else if (event === 1) {
                        setAddStatus(false)
                     }
                  }}
               >
                  <Radio value={2}>Mustaqil Baholash Asosida</Radio>
                  <Radio value={1}>O'zaro kelishuvga asosan</Radio>
               </Radio.Group>
            </div>
            <IndependentGoldSupply
               bahoType={bahoType}
               addStatus={addStatus}
               register={register}
            />
            <Input
               bordered
               label='Baholash hujjati sanasi'
               className='taminot_tableform_input'
               width='100%'
               type='date'
               placeholder="11.02.22"
               color="secondary"
               value={date}
               {...register("date", { required: true })}
               onChange={(e) => setDate(e.target.value)}
            />
            <GoldTable
               bahoItems={bahoItems}
               setBahoItems={setBahoItems}
               deletePoint={deletePoint}
               addNewPoint={addNewPoint}
               precisionRound={precisionRound}
            />

            <div className='taminot_grid'>
               <Input
                  bordered
                  label='Tilla buyumlarning baholangan qiymati'
                  className='margin_btn_15'
                  width='100%'
                  type='text'
                  value={totalSum()?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  color="secondary"
                  readOnly
               />
               <Input
                  readOnly
                  bordered
                  type='number'
                  label='Qabul qilish qiymati, %da'
                  className='margin_btn_15'
                  width='100%'
                  value={100}
                  color="secondary"
               />
               <Input
                  bordered
                  label="Qabul qilish qiymati, so'mda"
                  width='100%'
                  placeholder="1"
                  value={totalSum()?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  color="secondary"
                  readOnly
               />
            </div>
            <p className='margin_top_15'></p>

            <Container path={path} setPath={setPath} />

            <div className='submit-buttons margin_top_30'>
               <button type='reset' className='client_submit reset'>
                  Formani tiklash
                  <AiOutlineClear />
               </button>
               <button type='submit' className={`client_submit submit`}>
                  Ta'minotni qo'shish
                  <AiOutlineUserAdd />
               </button>
            </div>
         </form>
         <LoaderBackdrop disable={disable} />
      </>
   )
}

export default GoldSupply