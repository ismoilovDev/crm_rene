import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { List } from 'react-content-loader'
import { alert } from '../../../components/Alert/alert';
import Select from 'react-select';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop'
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https'

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
   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
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

function EditOwner() {
   const [loading, setLoading] = useState(true)
   const [ownerData, setOwnerData] = useState({})
   const [currentData, setCurrentData] = useState({})
   const [disable, setDisable] = useState(false)
   const [clientId, setClientId] = useState('')
   const [name, setName] = useState('')
   const navigate = useNavigate()
   let { id } = useParams()

   useEffect(() => {
      const getOwnerDetails = async () => {
         try {
            const { data } = await https.get(`/supply-info/${id}`)
            console.log(data)
            setOwnerData(data?.owner)
            setCurrentData(data?.owner)
            setName(data?.client_name)
            setClientId(data?.client_id)
            setLoading(false)
         } catch (err) {
            console.log(err)
         }
      }
      getOwnerDetails()
   }, [])

   function backFun() {
      setOwnerData(currentData)
   }

   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         setDisable(true)
         const info = {
            client_id: clientId,
            type: 'guarrantor'
         }
         const response = await https.patch(`/supply-info/${id}`, info);

         if (response.status !== 200) {
            throw new Error(`Opps, xatolik: ${response.status}`);
         } else {
            const supply_info_id = response.data.id;
            const owner_details = {
               ...ownerData,
               supply_info_id,
               id: ownerData?.id,
               doc_type: ownerData?.doc_type
            };
            const postOwner = async (details) => {
               await https
                  .post('/owners', details)
                  .then(_ => {
                     alert("Ta'minot o'zgartirildi", 'success')
                     navigate(`/taminot/singleuchinchi/${id}`)
                  })
                  .catch(err => {
                     alert(err?.response?.data?.message, 'error')
                  })
            }
            postOwner(owner_details)
         }
      } catch (err) {
         alert(`Xatolik: ${err.message}`, 'error')
         setDisable(false)
      } finally {
         setDisable(false)
      }
   }

   return (
      <>
         <section>
            <div className='filialform_header'>
               <Prev />
            </div>
            <div className='single_buyurtma'>
               {
                  loading ? (
                     <div className='margin_top_30'>
                        <List />
                     </div>
                  ) : (
                     <>
                        <h1 className='text_center filial_edit_text'>{name}</h1>
                        <div className='pdf_margin_top_15'>
                           <form onSubmit={onSubmit} className='single_buyurtma_info'>
                              <div className='single_buyurtma_inputs'>
                                 <p>Ta'minot turi:</p>
                                 <p>3 shaxs kafilligi</p>
                              </div>
                              <Input
                                 label="Uchinchi mulki egasining F.I.Sh."
                                 width='100%'
                                 color="secondary"
                                 bordered
                                 className='vall'
                                 clearable
                                 value={ownerData?.fio}
                                 onChange={(e) => {
                                    let newArray = { ...ownerData }
                                    newArray.fio = e.target.value
                                    setOwnerData(newArray)
                                 }}
                              >
                              </Input>
                              <div className='transport_garovPart_selectPart margin_btn_15'>
                                 <p>Shaxsini tasdiqlovchi xujjat</p>
                                 <Select
                                    defaultValue={options.find(x => x.label == ownerData?.doc_type)}
                                    value={options.find(x => x.label == ownerData?.doc_type)}
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
                                       let newArray = { ...ownerData }
                                       newArray.doc_type = e.label
                                       setOwnerData(newArray)
                                    }}
                                 />
                              </div>
                              <Input
                                 label="Seriyasi va raqami"
                                 width='100%'
                                 color="secondary"
                                 bordered
                                 className='vall'
                                 clearable
                                 value={ownerData?.serial_num}
                                 onChange={(e) => {
                                    let newArray = { ...ownerData }
                                    newArray.serial_num = e.target.value
                                    setOwnerData(newArray)
                                 }}
                              >
                              </Input>
                              <Input
                                 label="Kim tomonidan berilgan"
                                 width='100%'
                                 color="secondary"
                                 bordered
                                 className='vall'
                                 clearable
                                 value={ownerData?.issued_by}
                                 onChange={(e) => {
                                    let newArray = { ...ownerData }
                                    newArray.issued_by = e.target.value
                                    setOwnerData(newArray)
                                 }}
                              >
                              </Input>
                              <Input
                                 label="Berilgan sana"
                                 width='100%'
                                 color="secondary"
                                 bordered
                                 className='vall'
                                 type='date'
                                 value={ownerData?.issued_date}
                                 onChange={(e) => {
                                    let newArray = { ...ownerData }
                                    newArray.issued_date = e.target.value
                                    setOwnerData(newArray)
                                 }}
                              >
                              </Input>
                              <Input
                                 label="Telefon Raqami"
                                 width='100%'
                                 color="secondary"
                                 bordered
                                 className='vall'
                                 clearable
                                 value={ownerData?.phone}
                                 onChange={(e) => {
                                    let newArray = { ...ownerData }
                                    newArray.phone = e.target.value
                                    setOwnerData(newArray)
                                 }}
                              >
                              </Input>
                              <Input
                                 label="Ro'yxat bo'yicha yashash manzili"
                                 width='100%'
                                 color="secondary"
                                 bordered
                                 className='vall'
                                 clearable
                                 value={ownerData?.address}
                                 onChange={(e) => {
                                    let newArray = { ...ownerData }
                                    newArray.address = e.target.value
                                    setOwnerData(newArray)
                                 }}
                              >
                              </Input>
                              <Input
                                 label="Identifikatsiya raqami (JShShIR)"
                                 width='100%'
                                 color="secondary"
                                 bordered
                                 className='vall'
                                 value={ownerData?.pinfl}
                                 maxLength={14}
                                 onChange={(e) => {
                                    let newArray = { ...ownerData }
                                    newArray.pinfl = e.target.value
                                    setOwnerData(newArray)
                                 }}
                              >
                              </Input>
                              <div className='xodim_buttons'>
                                 <button type='button' className='client_submit reset back_red' onClick={() => { backFun() }}>
                                    O'zgarishni bekor qilish
                                    <AiOutlineClear />
                                 </button>
                                 <button type='submit' className='client_submit submit back_green'>
                                    O'zgarishni kiritish
                                    <AiOutlineUserAdd />
                                 </button>
                              </div>
                           </form>
                        </div>
                     </>)
               }
            </div>
         </section>
         <LoaderBackdrop disable={disable} />
      </>
   )
}
export default EditOwner