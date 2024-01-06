import { useContext, useEffect } from 'react';
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai'
import { Input, Textarea } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Context } from '../../../../context/context';
import ContainerEdit from '../../../../components/ImageContainer/ContainerEdit';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";


const livingConditions = ["yaxshi", "o'rtacha", "past"];
const workPlaces = ["shaxsiy", "ijara", "boshqa"];

function EditPart1() {
   const { path, setPath } = useContext(Context)
   const navigate = useNavigate()

   // Tab active
   const { setActiveTab, familyMem, setFamilyMem, mulkItem, setMulkItem, dataFirstQism, setDataFirstQism } = useContext(Context)

   useEffect(() => {
      setActiveTab(2)
   }, [])

   function nextStep() {
      navigate('/client-marks/edit/boshqa', { replace: true });
   }
   function backStep() {
      navigate("/client-marks/edit", { replace: true });
   }

   
   // ***********___Family___***********
   function addFamilyMember() {
      let newFamilyMember = ['']
      setFamilyMem(familyMem.concat(newFamilyMember))
   }
   function deleteFamilyMember(id) {
      if (familyMem?.length > 1) {
         let newFamilyMembers = familyMem?.filter((fam, famId) => famId !== (id))
         setFamilyMem(newFamilyMembers)
      }else if(familyMem?.length===1){
         setFamilyMem([])
      }
   }

   // ***********___Mulk___**********
   function addMulkItem() {
      let newmulkItem = ['']
      setMulkItem(mulkItem.concat(newmulkItem))
   }
   function deleteMulkItem(id) {
      if (mulkItem?.length > 1) {
         let newmulkItems = mulkItem?.filter((mulk, mulkId) => mulkId !== (id))
         setMulkItem(newmulkItems)
      }else if(mulkItem?.length===1){
         setMulkItem([])
      }
   }

   // UseForm
   const { register,
      handleSubmit,
      watch,
      formState: { errors, isValid }
   } = useForm();

   const onSubmit = (data) => {
      setTimeout(() => {
         nextStep()
      }, 500)
   }

   return (
      <>
         <h2 className='kl1_subtitle'>Buyurtmachining oilaviy sharoitini organish natijalari</h2>
         <form onSubmit={handleSubmit(onSubmit)}>
            <p className='kl1_formtitle'>Birgalikda istiqomat qiluvchilar</p>
            {
               familyMem?.map((item, index) => (
                  <div className='kl1_product' key={index}>
                     <Input
                        rounded
                        bordered
                        label='Istiqomat qiluvchi'
                        color="secondary"
                        width='93%'
                        className='kl1_input'
                        value={item}
                        onChange={(e) => {
                           let newFamilyMem = [...familyMem]
                           newFamilyMem[index] = e.target.value
                           setFamilyMem(newFamilyMem)
                        }}
                     />
                     <button
                        className='kl1_delete_button'
                        type='button'
                        onClick={() => deleteFamilyMember(index)}
                     >
                        <i className='bx bx-trash'></i>
                     </button>
                  </div>
               ))
            }
            <div className='margin_bottom20'>
               <button
                  className='kl1_add_button'
                  type='button'
                  onClick={() => { addFamilyMember() }}
               >
                  Istiqomat qiluvchi qoshish
               </button>
            </div>
            <Textarea
               width='100%'
               bordered
               rounded
               color="secondary"
               className='kl1_input'
               label='Oila azolari bilan suhbat davomida aniqlangan muhim malumotlar'
               value={dataFirstQism?.conversation_result}
               {...register("conversation_result", { required: false })}
               onChange={(e) => {
                  let newFirstQism = { ...dataFirstQism }
                  newFirstQism.conversation_result = e.target.value
                  setDataFirstQism(newFirstQism)
               }}
            />
            <p className='kl1_formtitle'>Buyurtmachining boshqa mulklari</p>
            {
               mulkItem?.map((item, index) => (
                  <div className='kl1_product' key={index}>
                     <Input
                        rounded
                        bordered
                        label='Mulk nomi'
                        color="secondary"
                        width='93%'
                        className='kl1_input'
                        value={item}
                        onChange={(e) => {
                           let newMulk = [...mulkItem]
                           newMulk[index] = e.target.value
                           setMulkItem(newMulk)
                        }}
                     />
                     <button
                        className='kl1_delete_button'
                        onClick={() => deleteMulkItem(index)}
                        type='button'
                     >
                        <i className='bx bx-trash'></i>
                     </button>
                  </div>
               ))
            }
            <div className='margin_bottom20'>
               <button
                  className='kl1_add_button'
                  onClick={() => { addMulkItem() }}
                  type='button'
               >
                  Mulkni qoshish
               </button>
            </div>

            <div className='flex_row margin_top_30'>
               <h3 className='margin_right_20'>Yashash sharoiti:</h3>
               <div className='tab_options_container margin_bottom_15'>
                  {
                     livingConditions?.map((item,index)=>{
                        return(
                           <button 
                              key={index}
                              className={`tab_option_btn ${item===dataFirstQism?.living_condition ? "active_option" : ""}`}
                              type="button"
                              onClick={()=>{
                                 let newFirstQism = { ...dataFirstQism }
                                 newFirstQism.living_condition = item
                                 setDataFirstQism(newFirstQism)
                              }}
                           > {item}
                           </button>
                        )
                     })
                  }
               </div>
            </div>

            <h2 className='kl1_subtitle margin_top_15'>Buyurtmachining faoliyati va daromad  manbalarini organish natijalari</h2>
            <div className='flex_row margin_top_15'>
               <h4 className='margin_right_20'>Faoliyat joyi:</h4>
               <div className='tab_options_container margin_bottom_15'>
                  {
                     workPlaces?.map((item,index)=>{
                        return(
                           <button 
                              key={index}
                              className={`tab_option_btn ${item===dataFirstQism?.owner ? "active_option" : ""}`}
                              type="button"
                              onClick={()=>{
                                 let newFirstQism = { ...dataFirstQism }
                                 newFirstQism.owner = item
                                 setDataFirstQism(newFirstQism)
                              }}
                           > {item}
                           </button>
                        )
                     })
                  }
               </div>
            </div>
            <Textarea
               width='100%'
               bordered
               rounded
               color="secondary"
               className='kl1_input'
               label='Buyurtmachining faoliyat turi'
               value={dataFirstQism?.type}
               {...register("type", { required: false })}
               onChange={(e) => {
                  let newFirstQism = { ...dataFirstQism }
                  newFirstQism.type = e.target.value
                  setDataFirstQism(newFirstQism)
               }}
            />
            <Input
               rounded
               bordered
               label='Faoliyat manzili'
               color="secondary"
               width='100%'
               className='kl1_input'
               value={dataFirstQism?.address}
               {...register("address", { required: false })}
               onChange={(e) => {
                  let newFirstQism = { ...dataFirstQism }
                  newFirstQism.address = e.target.value
                  setDataFirstQism(newFirstQism)
               }}
            />
            <Input
               rounded
               bordered
               label='Ushbu sohada foliyat yuritish davomiyligi'
               color="secondary"
               width='100%'
               className='kl1_input'
               value={dataFirstQism?.duration}
               {...register("duration", { required: false })}
               onChange={(e) => {
                  let newFirstQism = { ...dataFirstQism }
                  newFirstQism.duration = e.target.value
                  setDataFirstQism(newFirstQism)
               }}
            />
            <p className='margin_top_15'></p>
            <ContainerEdit path={path} setPath={setPath} />
            <div className='step_buttons double_button'>
               <button type='button' onClick={() => { backStep() }} className='previous_button'><AiOutlineDoubleLeft /><p>Oldingi</p></button>
               <button type='submit' className='step_next'><p>Keyingi</p> <AiOutlineDoubleRight /></button>
            </div>
         </form>
      </>
   )
}

export default EditPart1