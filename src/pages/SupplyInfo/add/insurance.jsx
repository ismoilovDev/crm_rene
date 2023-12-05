import { useState } from 'react'
import { useNavigate } from 'react-router';
import { Input } from '@nextui-org/react';
import { AiOutlineUserAdd, AiOutlineClear } from 'react-icons/ai';
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { alert } from '../../../components/Alert/alert';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import https from '../../../services/https';

function Insurance({ clientId }) {
   const [disable, setDisable] = useState(false)
   const navigate = useNavigate()
   const { register, handleSubmit } = useForm();
   const [ sum, setSum ] = useState(0)

   const mainRequest = async (post_data) => {
      const { data } = await https.post(`/supply-info`, post_data);
      return data.id
   }

   const onSubmit = async (data) => {
      setDisable(true)

      try {
         const info = {
            client_id: clientId,
            type: 'insurance',
            insurance:{
               ...data,
               sum:sum
            }
         }
         const response = mainRequest(info);
         alert("Ta'minot qo'shildi", 'success')
         navigate(-1)
         
      } catch (err) {
         alert(`Xatolik: ${err.message}`, 'error')
         setDisable(false)
      } finally {
         setDisable(false)
      }
   }

   return (
      <>
         <section className='sugurta_section'>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className='sugurta_main'>
                  <Input
                     label="Sug'urta kompaniyasining nomi"
                     placeholder='Ishonch'
                     width='100%'
                     color="secondary"
                     bordered
                     className='sugurta_input'
                     clearable
                     {...register("company_name", { required: true })}
                  >
                  </Input>
                  <Input
                     label='Sugurta polis raqami'
                     placeholder='12345678'
                     width='100%'
                     color="secondary"
                     bordered
                     className='sugurta_input'
                     clearable
                     {...register("policy", { required: true })}
                  >
                  </Input>
                  <div className="numeric_format_input width_100 border_radius_10 taminot_tableform_input">
                     <label>Sug'urta summasi</label>
                     <NumericFormat
                        thousandSeparator={' '}
                        value={sum}
                        onChange={(e)=>{
                           const changed_number = Number((e.target.value).replace(/\s/g, ''))
                           setSum(changed_number)
                        }}
                     />
                  </div>
                  <Input
                     label="Sug'urta sanasi"
                     width='100%'
                     color="secondary"
                     bordered
                     className='sugurta_input'
                     type='date'
                     {...register("issue_date", { required: true })}
                  >
                  </Input>
               </div>
               <div className='submit-buttons'>
                  <button className='client_submit reset' type='reset'>
                     Formani tiklash
                     <AiOutlineClear />
                  </button>
                  <button type='submit' className={`client_submit submit`}>
                     Ta'minotni qo'shish
                     <AiOutlineUserAdd />
                  </button>
               </div>
            </form>
         </section>
         <LoaderBackdrop disable={disable} />
      </>
   )
}

export default Insurance