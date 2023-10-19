import { useContext, useEffect } from 'react';
import { Input, Textarea } from '@nextui-org/react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';
import { Context } from '../../../context/context';
import Container from '../../../components/ImageContainer/Container';
import Checkbox from '../../../components/KL1/Checkbox'
import CounterCheckbox from '../../../components/KL1/CounterCheckbox';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";


const livingConditions = ["yaxshi", "o'rtacha", "past"];
const workPlaces = ["shaxsiy", "ijara", "boshqa"];

function FirstKl1() {
   const { path, setPath } = useContext(Context)
   const navigate = useNavigate()

   // Tab active
   const { activeTab, setActiveTab, 
      familyMem, setFamilyMem, 
      mulkItem, setMulkItem, 
      propertyTotal, setPropertyTotal,
      propertyCars, setPropertyCars,
      propertyAnimals, setPropertyAnimals,
      dataFirstQism, setDataFirstQism,
      familyMemCheck, setFamilyMemCheck 
   } = useContext(Context)

   useEffect(() => {
      setActiveTab(2)
   }, [])

   function NextStep() {
      navigate('/kl1/addkl1/boshqa', { replace: true })
   }
   function BackStep() {
      navigate("/kl1/addkl1", { replace: true });
   }


   // ********___Family___********* //
   const addFamilyMember = (value) =>{
      let newFamilyMember = [{
         id: uuidv4(),
         name: value || ''
      }]

      const newArr = [...familyMem, ...newFamilyMember]
      setFamilyMem(newArr)
   }
   const deleteFamilyMember = (id) =>{
      if (familyMem.length > 0) {
         let newFamilyMembers = familyMem.filter((fam, famId) => famId !== (id))
         setFamilyMem(newFamilyMembers)
      }
   }

   // ***********___Mulk___**********
   function addMulkItem() {
      let newmulkItem = [{
         id: uuidv4(),
         name: ''
      }]
      setMulkItem(mulkItem.concat(newmulkItem))
   }
   function deleteMulkItem(id) {
      if (mulkItem.length > 0) {
         let newmulkItems = mulkItem.filter((mulk, mulkId) => mulkId !== (id))
         setMulkItem(newmulkItems)
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
         NextStep()
      }, 500)
   }


   return (
      <>
         <h2 className='kl1_subtitle'>Buyurtmachining oilaviy sharoitini o'rganish natijalari</h2>
         <form onSubmit={handleSubmit(onSubmit)}>
            {/* Family Members */}
            <p className='kl1_formtitle'>Birgalikda istiqomat qiluvchilar</p>
            <div className="check_variants margin_top_15">
               {
                  familyMemCheck?.map(item=>{
                     return(
                     <Checkbox
                        key={item?.id}
                        value={item?.name}
                        array={familyMemCheck}
                        setArray={setFamilyMemCheck}
                        idItem={item?.id}
                     />)
                  })
               }
            </div> 
            <div className='margin_top_15'>
               {
                  familyMem?.map((item, index) => (
                     <div className='kl1_product' key={item?.id}>
                        <Input
                           rounded
                           bordered
                           label='Istiqomat qiluvchi'
                           color="secondary"
                           width='93%'
                           className='kl1_input'
                           value={familyMem.find(x => x.id === item.id).name}
                           onChange={(e) => {
                              let newFamilyMem = [...familyMem]
                              newFamilyMem[index].name = e.target.value
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
            </div>
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

            {/* Properties */}
            <p className='kl1_formtitle'>Buyurtmachining boshqa mulklari</p>
            <div className='property_options margin_top_15'>
               <div className='options_container'>
                  <h3 className='margin_bottom'>Asosiy:</h3>
                  <div className='wrapper'>
                     {
                        propertyTotal?.map(item=>{
                           return(
                           <Checkbox
                              key={item?.id}
                              value={item?.name}
                              array={propertyTotal}
                              setArray={setPropertyTotal}
                              idItem={item?.id}
                           />)
                        })
                     }
                  </div>
               </div>
               <div className='options_container'>
                  <h3 className='margin_bottom'>Hayvon:</h3>
                  <div className='wrapper'>
                     {
                        propertyAnimals?.map(item=>{
                           return(
                           <CounterCheckbox
                              key={item?.id}
                              value={item?.name}
                              array={propertyAnimals}
                              setArray={setPropertyAnimals}
                              idItem={item?.id}
                           />)
                        })
                     }
                  </div>
               </div>
               <div className='options_container'>
                  <h3 className='margin_bottom'>Avtomobillar:</h3>
                  <div className='wrapper'>
                     {
                        propertyCars?.map(item=>{
                           return(
                           <Checkbox
                              key={item?.id}
                              value={item?.name}
                              array={propertyCars}
                              setArray={setPropertyCars}
                              idItem={item?.id}
                           />)
                        })
                     }
                  </div>
               </div>
            </div>
            {
               mulkItem.map((item, index) => (
                  <div className='kl1_product' key={item.id}>
                     <Input
                        rounded
                        bordered
                        label='Mulk nomi'
                        color="secondary"
                        width='93%'
                        className='kl1_input'
                        value={mulkItem.find(x => x.id === item.id).name}
                        onChange={(e) => {
                           let newMulk = [...mulkItem]
                           newMulk[index].name = e.target.value
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

            <div className='flex_row margin_top_50'>
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

            <Container path={path} setPath={setPath} />

            <div className='step_buttons double_button'>
               <button type='button' onClick={() => { BackStep() }} className='previous_button'><AiOutlineDoubleLeft /><p>Oldingi</p></button>
               <button type='submit' className='step_next'><p>Keyingi</p> <AiOutlineDoubleRight /></button>
            </div>
         </form>
      </>
   )
}
export default FirstKl1