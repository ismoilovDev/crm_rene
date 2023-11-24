import { useState } from 'react'
import { Input } from '@nextui-org/react';
import { useForm } from "react-hook-form";
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { useNavigate } from 'react-router';
import { alert } from '../../../components/Alert/alert';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import Select from 'react-select';
import https from '../../../services/https';

const options = [
   { value: '1', label: "O'zR fuqarosining ID kartasi" },
   { value: '2', label: "O'zR Fuqarosining pasporti" },
   { value: '3', label: "Harbiy xizmatchi guvohnomasi" },
   { value: '4', label: "Xizmat guvohnomasi" },
   { value: '5', label: "Xorijiy fuqaro pasporti" },
   { value: '6', label: "Yashash guvohnomasi" },
   { value: '7', label: "O'zR Fuqarosining biometrik pasporti" },
   { value: '8', label: "Tug'ulganlik haqidagi guvohnoma" },
   { value: '9', label: "O'zR fuqarosining yangi namunadagi haydovchilik guvohnomasi" },
   { value: '10', label: "Boshqa" }
];

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

function Owner({ clientId }) {
   const [optionSelected, setOptionSelected] = useState(options[0])
   const [disable, setDisable] = useState(false)
   const navigate = useNavigate()
   const { register, handleSubmit } = useForm()

   const onSubmit = async (data) => {
      try {
         setDisable(true)
         const info = {
            client_id: clientId,
            type: 'guarrantor',
         
         }
         const response = await https.post(`/supply-info`, info);

         if (response.status !== 200) {
            throw new Error(`Opps, xatolik: ${response.status}`);
         } else {
            const supply_info_id = response.data.id;
            const details = {
               ...data,
               doc_type: optionSelected?.label,
               is_guarrantor: 0,
               supply_info_id
            };

            const postOwner = async (details) => {
               await https.post('/owners', details)
                  .then(_ => {
                     alert("Ta'minot qoshildi", 'success');
                     navigate(-1)
                  })
                  .catch(err => {
                     alert(err?.response?.data?.message, 'error');
                  })
            };
            postOwner(details)
         }

      } catch (err) {
         alert(`Xatolik: ${err.message}`, 'error')
         setDisable(false)
      } finally {
         setDisable(false)
      }
   };

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className='transport_garovPart'>
               <Input
                  label='Uchinchi mulki egasining F.I.Sh.'
                  placeholder=' Muxammadshukurov Xusniddin Fatxulla o`g`li'
                  clearable
                  width='100%'
                  color="secondary"
                  bordered
                  className='transport_garovPart_input'
                  {...register("fio", { required: true })}
               />
               <div className='transport_garovPart_selectPart margin_bottom_15'>
                  <p>Shaxsini tasdiqlovchi xujjat</p>
                  <Select
                     defaultValue={optionSelected}
                     value={optionSelected}
                     options={options}
                     className='buyurtma_select_new'
                     styles={colourStyles}
                     theme={(theme) => ({
                        ...theme,
                        borderRadius: 12,
                        colors: {
                           ...theme.colors,
                           primary25: '#7828c8',
                           primary: '#7828c8',
                        },
                     })}
                     onChange={(e) => {
                        setOptionSelected(e)
                     }}
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
                  {...register("serial_num", { required: true })}
               />
               <Input
                  label='Kim tomonidan berilgan'
                  clearable
                  placeholder='Toshkent viloyati Bo`ka tumani Mudofa '
                  width='100%'
                  color="secondary"
                  bordered
                  className='transport_garovPart_input'
                  {...register("issued_by", { required: true })}
               />
               <Input
                  label='Berilgan sana'
                  type='date'
                  width='100%'
                  color="secondary"
                  bordered
                  className='transport_garovPart_input'
                  {...register("issued_date", { required: true })}
               />
               <Input
                  label='Telefon Raqami'
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  width='100%'
                  color="secondary"
                  bordered
                  labelLeft='+998'
                  placeholder='991235678'
                  className='transport_garovPart_input'
                  {...register("phone", { required: true })}
               />
               <Input
                  label="Ro'yxat bo'yicha yashash manzili"
                  clearable
                  placeholder='Toshkent viloyati Bo`ka tumani Y.Xojimetov fu O`zbekiston ko`chasi 92 uy'
                  width='100%'
                  color="secondary"
                  bordered
                  className='transport_garovPart_input'
                  {...register("address", { required: true })}
               />
               <Input
                  label='Identifikatsiya raqami (JShShIR)'
                  placeholder='123456789'
                  type='number'
                  onWheel={(e) => e.target.blur()}
                  clearable
                  width='100%'
                  color="secondary"
                  bordered
                  className='transport_garovPart_input'
                  {...register("pinfl", { required: true, minLength: 14 })}
               />
            </div>
            <div className='submit-buttons'>
               <button type='button' className='client_submit reset'>
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

export default Owner