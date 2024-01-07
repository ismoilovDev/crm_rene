import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from '@nextui-org/react'
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai'
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { Radio } from "@nextui-org/react";
import { List } from 'react-content-loader';
import { BiTrash } from 'react-icons/bi';
import { NumericFormat } from "react-number-format";
import { alert } from '../../../components/Alert/alert';
import ContainerEdit from '../../../components/ImageContainer/ContainerEdit';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import precisionRound from '../../../utils/functions/precisionRound';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';
import { SinglePage } from '../../../utils/functions/supplySinglePage';

const company_details = { id: 0, name: '', license: '', doc_code: '', valuer_name: '' }

function EditGold() {
   const navigate = useNavigate()
   const [goldCurrentDatas, setGoldCurrentDatas] = useState({})
   const [company, setCompany] = useState(company_details)
   const [disable, setDisable] = useState(false)
   const [goldInfo, setGoldInfo] = useState({})
   const [loading, setLoading] = useState(true)
   const [golds, setGolds] = useState([])
   const [path, setPath] = useState([])
   const { handleSubmit } = useForm()
   const { id } = useParams()

   async function getData() {
      await https
         .get(`/supply-info/${id}`)
         .then(({ data }) => {
            console.log(data);
            setPath(data?.images)
            setGoldInfo(data)
            setGoldCurrentDatas(data)
            if (+data.valued_by !== 1) {
               setCompany(data?.company)
            }
            setGolds(data?.gold)
            setLoading(false)
         })
         .catch(err => {
            console.log(err)
         })
   }

   useEffect(() => {
      getData()
   }, [])

   function RadioColl() {
      if (goldInfo?.valued_by) {
         return (
            <Radio.Group
               label=' '
               size='sm'
               color='secondary'
               orientation="horizontal"
               className='taminot_ratio'
               defaultValue={Number(goldInfo?.valued_by)}
               onChange={(event) => {
                  const newArray = { ...goldInfo }
                  newArray.valued_by = event
                  setGoldInfo(newArray)
               }}
            >
               <Radio value={2}>Mustaqil Baholash Asosida</Radio>
               <Radio value={1}>O'zaro kelishuvga asosan</Radio>
            </Radio.Group>
         )
      } else {
         <></>
      }
   }

   function addNewGold() {
      let newGold = {
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
      setGolds([...golds, newGold])
   }

   function deleteGold(id) {
      if (golds.length > 1) {
         let goldItems = golds.filter(x => x.id !== id)
         setGolds(goldItems)
      }
   }

   function totalSum() {
      let SumArray = []
      golds?.map((item) => {
         SumArray.push(item?.sum)
      })
      let total = SumArray.reduce((prev, current) => prev + current, 0)

      return total
   }

   function backFun() {
      setGoldInfo({ ...goldCurrentDatas })
   }

   const mainRequest = async (post_data) => {
      const { data } = await https.patch(`/supply-info/${id}`, post_data);
      return data.id
   }

   const onSubmit = async () => {
      const total = totalSum()
      setDisable(true);
      const gold_items = golds.map(({ id, ...item }) => item)

      const main_data = {
         client_id: goldInfo?.client_id,
         type: 'gold',
         possessor: 'client',
         valued_by: goldInfo?.valued_by,
         date: goldInfo?.date,
         sum: Number(total),
         paths: path,
         percent: 100,
         gold: gold_items
      };

      if (+goldInfo?.valued_by === 2) {
         const companyWithoutId = { ...company };
         delete companyWithoutId.id
         Object.assign(main_data, {company: companyWithoutId})
      }

      try {
         const res = await mainRequest(main_data)
         alert("Ta'minot o'zgartirildi", 'success');
         // SinglePage('gold', id)
      } catch (err) {
         const errorMessage = err?.response?.data?.message || "Xatolik";
         alert(errorMessage, 'error');
      } finally {
         setDisable(false);
      }
   };

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
                        <h1 className='text_center filial_edit_text'>{goldInfo?.client_name}</h1>
                        <div className='pdf_margin_top_15'>
                           <form onSubmit={handleSubmit(onSubmit)} className='single_buyurtma_info'>
                              <div className='taminot_ratio_parent taminot_tilla_radio'>
                                 <RadioColl />
                              </div>
                              <div className='single_buyurtma_inputs'>
                                 <p>Ta'minot turi:</p>
                                 <p>Tilla Buyumlar Garovi</p>
                              </div>
                              <div className={+goldInfo?.valued_by === 2 ? 'taminot_bahoType' : 'close'}>
                                 <Input
                                    bordered
                                    label='Tilla buyumlarni baholovchi tashkilot'
                                    className='vall'
                                    width='100%'
                                    clearable
                                    placeholder="Voziq Mirzo"
                                    color="secondary"
                                    value={company?.name}
                                    onChange={(e) => {
                                       const newCompany = { ...company }
                                       newCompany.name = e.target.value
                                       setCompany(newCompany)
                                    }}
                                 />
                                 <Input
                                    bordered
                                    label='Litsenziya'
                                    className='vall'
                                    width='100%'
                                    clearable
                                    placeholder=" Litsenziya BL001, RR0118, 19.02.2014 y. berilgan"
                                    color="secondary"
                                    value={company?.license}
                                    onChange={(e) => {
                                       const newCompany = { ...company }
                                       newCompany.license = e.target.value
                                       setCompany(newCompany)
                                    }}
                                 />
                                 <Input
                                    bordered
                                    label='Baholovchining ismi sharifi'
                                    className='vall'
                                    width='100%'
                                    clearable
                                    placeholder="B.Asomov"
                                    color="secondary"
                                    value={company?.valuer_name}
                                    onChange={(e) => {
                                       const newCompany = { ...company }
                                       newCompany.valuer_name = e.target.value
                                       setCompany(newCompany)
                                    }}
                                 />
                                 <Input
                                    bordered
                                    label='Baholash hujjati raqami'
                                    width='100%'
                                    clearable
                                    className='vall'
                                    placeholder="06/002"
                                    color="secondary"
                                    value={company?.doc_code}
                                    onChange={(e) => {
                                       const newCompany = { ...company }
                                       newCompany.doc_code = e.target.value
                                       setCompany(newCompany)
                                    }}
                                 />
                              </div>
                              <div className='margin_top_15'>
                                 <Input
                                    bordered
                                    label='Baholash hujjati sanasi'
                                    className='vall'
                                    width='100%'
                                    type='date'
                                    placeholder="11.02.22"
                                    color="secondary"
                                    value={goldInfo?.date}
                                    onChange={(e) => {
                                       let newArray = { ...goldInfo }
                                       newArray.date = e.target.value
                                       setGoldInfo(newArray)
                                    }}
                                 />
                                 <h1>Baholash natijalari</h1>
                                 {
                                    golds?.map((item, index) => (
                                       <div className='taminot_tableform_item' key={item?.id}>
                                          <div className='taminot_tableform_title'>
                                             <h2>Mahsulot №{index + 1}</h2>
                                             <button
                                                className='taminot_tableform_delete taminot_tableform_delete_active'
                                                onClick={() => deleteGold(item?.id)}
                                                type='button'
                                             >
                                                <BiTrash />
                                             </button>
                                          </div>
                                          <div className='taminot_gold_product'>
                                             <Input
                                                bordered
                                                label='Nomi'
                                                className='vall'
                                                clearable
                                                placeholder="Uzuk"
                                                color="secondary"
                                                value={golds.find(x => x.id === item.id).name}
                                                onChange={(e) => {
                                                   const newGold = [...golds]
                                                   newGold[index].name = e.target.value
                                                   setGolds(newGold)
                                                }}
                                             />
                                             <Input
                                                bordered
                                                label='Proba'
                                                className='vall'
                                                clearable
                                                placeholder="583"
                                                type='number'
                                                onWheel={(e) => e.target.blur()}
                                                color="secondary"
                                                value={golds.find(x => x.id === item.id).gold_num}
                                                onChange={(e) => {
                                                   const newGold = [...golds]
                                                   newGold[index].gold_num = e.target.value
                                                   setGolds(newGold)
                                                }}
                                             />
                                             <Input
                                                bordered
                                                label="O'lchov birligi"
                                                className='vall'
                                                placeholder="dona"
                                                color="secondary"
                                                value={golds.find(x => x.id === item.id).measure}
                                                onChange={(e) => {
                                                   const newGold = [...golds]
                                                   newGold[index].measure = e.target.value
                                                   setGolds(newGold)
                                                }}
                                                clearable
                                             />
                                             <Input
                                                bordered
                                                type='number'
                                                onWheel={(e) => e.target.blur()}
                                                label='Soni'
                                                className='vall'
                                                placeholder="1"
                                                color="secondary"
                                                value={golds.find(x => x.id === item.id).quantity}
                                                onChange={(e) => {
                                                   const newGold = [...golds]
                                                   newGold[index].quantity = e.target.value
                                                   setGolds(newGold)
                                                }}
                                                clearable
                                             />
                                             <Input
                                                bordered
                                                type='number'
                                                onWheel={(e) => e.target.blur()}
                                                label='Umumiy og`irligi(gr)'
                                                className='vall'
                                                placeholder="1"
                                                color="secondary"
                                                value={golds.find(x => x.id === item.id).weight}
                                                onChange={(e) => {
                                                   const newGold = [...golds]
                                                   newGold[index].weight = e.target.value
                                                   newGold[index].clean_weight = e.target.value - newGold[index].stone_weight
                                                   newGold[index].sum = (e.target.value - newGold[index].stone_weight) * newGold[index].gold_num_sum
                                                   setGolds(newGold)
                                                   const newObj = { ...goldInfo }
                                                   newObj.percent = (newObj.sum == 0 || totalSum() == 0) ? 0 : ((newObj.sum / totalSum()) * 100).toFixed(1)
                                                   setGoldInfo(newObj)
                                                }}
                                                clearable
                                             />
                                             <Input
                                                bordered
                                                type='number'
                                                onWheel={(e) => e.target.blur()}
                                                label='Toshlari og`irligi(gr)'
                                                className='vall'
                                                placeholder="1"
                                                color="secondary"
                                                value={golds.find(x => x.id === item.id).stone_weight}
                                                onChange={(e) => {
                                                   const newGold = [...golds]
                                                   newGold[index].stone_weight = e.target.value
                                                   newGold[index].clean_weight = newGold[index].weight - e.target.value
                                                   newGold[index].sum = (newGold[index].weight - e.target.value) * newGold[index].gold_num_sum
                                                   setGolds(newGold)
                                                   const newObj = { ...goldInfo }
                                                   newObj.percent = (newObj.sum == 0 || totalSum() == 0) ? 0 : ((newObj.sum / totalSum()) * 100).toFixed(1)
                                                   setGoldInfo(newObj)
                                                }}
                                                clearable
                                             />
                                             <Input
                                                bordered
                                                type='number'
                                                onWheel={(e) => e.target.blur()}
                                                label='Sof og`irligi(gr)'
                                                className='vall'
                                                placeholder="1"
                                                color="secondary"
                                                readOnly
                                                value={precisionRound(golds.find(x => x.id === item.id).clean_weight, 2)}
                                             />
                                             <div className="numeric_format_input without_margin width_100 border_radius_10 taminot_tableform_input">
                                                <label>Gramm uchun narx(so`m)</label>
                                                <NumericFormat
                                                   thousandSeparator={' '}
                                                   value={golds?.find(x => x?.id === item?.id)?.gold_num_sum}
                                                   onChange={(e)=>{
                                                      const changed_number = Number((e.target.value).replace(/\s/g, ''))
                                                      const newGold = [...golds]
                                                      newGold[index].gold_num_sum = changed_number
                                                      newGold[index].sum = changed_number * newGold[index].clean_weight
                                                      setGolds(newGold)
                                                      const newObj = { ...goldInfo }
                                                      newObj.percent = (newObj.sum == 0 || totalSum() == 0) ? 0 : ((newObj.sum / totalSum()) * 100).toFixed(1)
                                                      setGoldInfo(newObj)
                                                   }}
                                                />
                                             </div>
                                             <Input
                                                bordered
                                                type='text'
                                                label="Baholangan qiymati(so'm)"
                                                className='vall'
                                                placeholder="1"
                                                color="secondary"
                                                readOnly
                                                value={golds.find(x => x.id === item.id).sum?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                             />
                                          </div>
                                       </div>
                                    ))
                                 }
                                 <div className='transport_product_addPlace margin_top_15 margin_bottom_15'>
                                    <button type='button' className='transport_product_addButton' onClick={addNewGold}>
                                       <i className='bx bx-plus-circle'></i>
                                    </button>
                                 </div>
                                 <Input
                                    bordered
                                    label='Tilla buyumlarning baholangan qiymati'
                                    className='vall'
                                    width='100%'
                                    type='text'
                                    value={totalSum()?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    color="secondary"
                                    readOnly
                                 />
                                 <Input
                                    bordered
                                    type='number'
                                    label='Qabul qilish qiymati, %da'
                                    className='vall'
                                    width='100%'
                                    readOnly
                                    value={100}
                                    color="secondary"
                                 />
                                 <Input
                                    bordered
                                    label="Qabul qilish qiymati, so'mda"
                                    className='taminot_tableform_input'
                                    width='100%'
                                    placeholder="1"
                                    value={totalSum()?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    color="secondary"
                                    readOnly
                                 />
                                 <ContainerEdit path={path} setPath={setPath} />
                              </div>
                              <div className='xodim_buttons'>
                                 <button type='button' className='client_submit reset back_red' onClick={backFun}>
                                    O'zgarishni bekor qilish
                                    <AiOutlineClear />
                                 </button>
                                 <button type='submit' className={`client_submit submit back_green`}>
                                    O'zgarishni kiritish
                                    <AiOutlineUserAdd />
                                 </button>
                              </div>
                           </form>
                        </div>
                     </>
                  )
               }
            </div>
         </section>
         <LoaderBackdrop disable={disable} />
      </>
   )
}

export default EditGold