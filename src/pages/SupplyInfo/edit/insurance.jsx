import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { List } from 'react-content-loader'
import { NumericFormat } from "react-number-format";
import { alert } from '../../../components/Alert/alert';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop'
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https'
import { SinglePage } from '../../../utils/functions/supplySinglePage'

function EditInsurance() {
   const [loading, setLoading] = useState(true)
   const [insuranceData, setInsuranceData] = useState({})
   const [currentData, setCurrentData] = useState({})
   const [disable, setDisable] = useState(false)
   const [clientId, setClientId] = useState('')
   const [name, setName] = useState('')
   const navigate = useNavigate()
   const { id } = useParams()

   useEffect(() => {
      const getInsuranceDetails = async () => {
         try {
            const { data } = await https.get(`/supply-info/${id}`)
            setInsuranceData(data?.insurance)
            setCurrentData(data?.insurance)
            setName(data?.client_name)
            setClientId(data?.client_id)
            setLoading(false)
         } catch (err) {
            console.log(err)
         }
      }
      getInsuranceDetails()
   }, [id])

   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         const info = {
            client_id: clientId,
            type: 'insurance',
            insurance: {...insuranceData}
         }
         const response = await https.patch(`/supply-info/${id}`, info);
         alert("Ta'minot o'zgartirildi", 'success');
         // SinglePage('insurance', id)
      } catch (err) {
         const errorMessage = err?.response?.data?.message || "Xatolik";
         alert(errorMessage, 'error');
      } finally {
         setDisable(false)
      }
   }

   function backFun() {
      setInsuranceData(currentData)
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
                                 <p>Sugurta kompaniyasi sugurta polisi</p>
                              </div>
                              <Input
                                 label="Sug'urta kompaniyasining nomi"
                                 width='100%'
                                 color="secondary"
                                 bordered
                                 className='vall'
                                 clearable
                                 value={insuranceData?.company_name}
                                 onChange={(e) => {
                                    let newArray = { ...insuranceData }
                                    newArray.company_name = e.target.value
                                    setInsuranceData(newArray)
                                 }}
                              >
                              </Input>
                              <Input
                                 label="Sugurta polis raqami"
                                 width='100%'
                                 color="secondary"
                                 bordered
                                 className='vall'
                                 clearable
                                 value={insuranceData?.policy}
                                 onChange={(e) => {
                                    let newArray = { ...insuranceData }
                                    newArray.policy = e.target.value
                                    setInsuranceData(newArray)
                                 }}
                              >
                              </Input>
                              <div className="numeric_format_input width_100 border_radius_10 taminot_tableform_input">
                                 <label>Sug'urta summasi</label>
                                 <NumericFormat
                                    thousandSeparator={' '}
                                    value={insuranceData?.sum}
                                    onChange={(e)=>{
                                       const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                       let newArray = { ...insuranceData }
                                       newArray.sum = changed_number
                                       setInsuranceData(newArray)
                                    }}
                                 />
                              </div>
                              <Input
                                 label="Sug'urta sanasi"
                                 width='100%'
                                 color="secondary"
                                 bordered
                                 className='vall'
                                 type='date'
                                 value={insuranceData?.issue_date}
                                 onChange={(e) => {
                                    let newArray = { ...insuranceData }
                                    newArray.issue_date = e.target.value
                                    setInsuranceData(newArray)
                                 }}
                              >
                              </Input>
                              <div className='xodim_buttons'>
                                 <button type='button' className='client_submit reset back_red'
                                    onClick={() => { backFun() }}
                                 >
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

export default EditInsurance