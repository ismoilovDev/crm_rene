import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input, Radio } from '@nextui-org/react';
import { useForm } from "react-hook-form";
import { AiOutlineClear, AiOutlineUserAdd } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import { NumericFormat } from "react-number-format";
import { alert } from '../../../components/Alert/alert';
import { AutoTable } from '../../../components/SupplyInfo/AutoTable';
import { IndependentSupply } from '../../../components/SupplyInfo/SupplyInfo';
import { AutoOwner, AutoTrustOwner } from '../../../components/SupplyInfo/AutoOwner';
import LoaderBackdrop from '../../../components/Loader/LoaderBackdrop';
import Container from '../../../components/ImageContainer/Container';
import https from '../../../services/https';

const options = [
   { value: '1', label: "O'zR fuqarosining ID kartasi" },
   { value: '2', label: "O'zR Fuqarosining biometrik pasporti" },
   { value: '3', label: "Harbiy xizmatchi guvohnomasi" },
   { value: '4', label: "Xizmat guvohnomasi" },
   { value: '5', label: "Xorijiy fuqaro pasporti" },
   { value: '6', label: "Yashash guvohnomasi" },
   { value: '7', label: "O'zR Fuqarosining pasporti" },
   { value: '8', label: "Tug'ulganlik haqidagi guvohnoma" },
   { value: '9', label: "O'zR fuqarosining yangi namunadagi haydovchilik guvohnomasi" },
   { value: '10', label: "Boshqa" }
];

const defaultTransportProducts = [
   {
      id: uuidv4(),
      name: '',
      year: '',
      number: '',
      type_of_auto: '',
      registration_cert: '',
      engine_number: '',
      body_code: '',
      registration_date: '',
      registrated_by: '',
      chassis: '',
      sum: 0
   }
]

function Transport({ clientId }) {
   const [disable, setDisable] = useState(false)
   const [firstTable, setFirstTable] = useState('transport_garovPart close');
   const [secondTable, setSecondTable] = useState('transport_ishonchnomaPart close');
   const [garov, setGarov] = useState('transport_fourInputs close');
   const [possessor, setPossessor] = useState('client')
   const [path, setPath] = useState([])
   const [valuedStatus, setValuedStatus] = useState(false)
   const [valuedNumber, setValuedNumber] = useState(1)
   const [ownerStatus, setOwnerStatus] = useState(false)
   const [trustOwnerStatus, setTrustOwnerStatus] = useState(false)
   const [giveSum, setGiveSum] = useState()
   const [transportProducts, setTransportProducts] = useState(JSON.parse(JSON.stringify(defaultTransportProducts)));
   const [ownerSelector, setOwnerSelector] = useState(options[0].label)
   const [trustOwnerSelector, setTrustOwnerSelector] = useState(options[0].label)
   const { register, handleSubmit } = useForm();
   const navigate = useNavigate()

   function tables(a) {
      if (a === 1) {
         setFirstTable('transport_garovPart close')
         setSecondTable('transport_ishonchnomaPart close')
         setOwnerStatus(false)
         setTrustOwnerStatus(false)
         setPossessor('client')
      }
      else if (a === 2) {
         setFirstTable('transport_garovPart open')
         setSecondTable('transport_ishonchnomaPart close')
         setOwnerStatus(true)
         setTrustOwnerStatus(false)
         setPossessor('owner')
      } else if (a === 3) {
         setFirstTable('transport_garovPart open')
         setSecondTable('transport_ishonchnomaPart open')
         setOwnerStatus(true)
         setTrustOwnerStatus(true)
         setPossessor('trust_owner')
      }
   }

   function fourInputs(b) {
      if (b === 2) {
         setGarov('transport_fourInputs open')
         setValuedStatus(true)
         setValuedNumber(2)
      }
      else {
         setGarov('transport_fourInputs close')
         setValuedStatus(false)
         setValuedNumber(1)
      }
   }

   function addNewTransportProduct() {
      setTransportProducts([...transportProducts, ...JSON.parse(JSON.stringify(defaultTransportProducts))])
   }

   function deleteTransportProduct(id) {
      if (transportProducts.length > 1) {
         setTransportProducts(transportProducts?.filter(item => item.id !== id))
      } else {
         setTransportProducts(transportProducts)
      }
   }

   function getTotalSum() {
      if (!Array.isArray(transportProducts)) {
         return 0;
      }
      const totalSum = transportProducts.reduce((sum, item) => {
         return Number(sum) + (Number(item?.sum) || 0);
      }, 0);

      return totalSum;
   }

   const mainRequest = async (post_data) => {
      const { data } = await https.post(`/supply-info`, post_data);
      return data.id
   }

   const onSubmit = async (data) => {
      if (path.length === 0) return alert(`Rasm kiriting!`, 'error')

      setDisable(true);
      const transports = transportProducts.map(({ id, ...item }) => item);
      const main_data = {
         client_id: clientId,
         type: 'auto',
         possessor: possessor,
         valued_by: valuedNumber,
         sum: giveSum,
         date: data?.date,
         percent: ((giveSum === 0 || getTotalSum() === 0) ? 0 : ((giveSum / getTotalSum()) * 100).toFixed(1)),
         paths: path,
         auto: transports
      }

      if(valuedStatus){
         Object.assign(main_data, {company: data.company})
      }

      if(possessor === 'owner' || possessor === 'trust_owner'){
         Object.assign(main_data, {owner: { ...data.owner, doc_type: ownerSelector, is_guarrantor: false}})
      }

      if(possessor === 'trust_owner'){
         Object.assign(main_data, {trust_owner: { ...data.trust_owner, doc_type: trustOwnerSelector}})
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
         <section className='transport_section'>
            <form className='transport_main' onSubmit={handleSubmit(onSubmit)}>
               <div className='transport_garov'>
                  <p>Garov mulkining egasi</p>
                  <div>
                     <Radio.Group label=' ' orientation="horizontal" color='secondary' defaultValue={1} size='sm' className='transport_garov_radioGroup' onChange={(e) => tables(e)}>
                        <Radio value={1} className='transport_garov_radio'>Mijozning o'zi</Radio>
                        <Radio value={2} className='transport_garov_radio'>Uchinchi shaxs</Radio>
                        <Radio value={3} className='transport_garov_radio'>Ishonchnoma asosida</Radio>
                     </Radio.Group>
                  </div>
               </div>
               <div className='transport_addition'>
                  <Radio.Group label=' ' orientation="horizontal" color='secondary' defaultValue={1} size='sm' className='transport_addition_radioGroup' onChange={(e) => fourInputs(e)}>
                     <Radio value={2} className='transport_addition_radio'>Mustaqil baholash asosida</Radio>
                     <Radio value={1} className='transport_addition_radio'>O'zaro kelishuvga asosan</Radio>
                  </Radio.Group>
               </div>
               <IndependentSupply class_name={garov} register={register} valuedStatus={valuedStatus} />
               <div className='transport_mainInputs'>
                  <Input
                     label='Baholovchi hujjat sanasi'
                     width='100%'
                     color="secondary"
                     bordered
                     className='transport_mainInputs_input'
                     type='date'
                     {...register(`date`, { required: true })}
                  />
               </div>
               <AutoTable
                  transportProducts={transportProducts}
                  setTransportProducts={setTransportProducts}
                  deleteTransportProduct={deleteTransportProduct}
                  addNewTransportProduct={addNewTransportProduct}
               />
               <div className='transport_endMainInputs'>
                  <Input
                     label='Baholangan qiymati'
                     type='text'
                     className='margin_btn_15'
                     value={getTotalSum()?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                     readOnly
                     width='100%'
                     color="secondary"
                     bordered
                  >
                  </Input>
                  <Input
                     label='Qabul qilish qiymati, %da'
                     width='100%'
                     color="secondary"
                     className='margin_btn_15'
                     bordered
                     value={(giveSum === 0 || getTotalSum() === 0) ? 0 : ((giveSum / getTotalSum()) * 100).toFixed(1)}
                     readOnly
                  >
                  </Input>
                  <div className="numeric_format_input without_margin width_100 border_radius_10 taminot_tableform_input">
                     <label>Qabul qilish qiymati, so'mda</label>
                     <NumericFormat
                        thousandSeparator={' '}
                        value={giveSum}
                        onChange={(e) => {
                           const changed_number = Number((e.target.value).replace(/\s/g, ''))
                           setGiveSum(changed_number)
                        }}
                     />
                  </div>
                  <p className='margin_top_15'></p>
                  <Container path={path} setPath={setPath} />

               </div>
               <AutoOwner
                  options={options}
                  register={register}
                  firstTable={firstTable}
                  ownerStatus={ownerStatus}
                  setOwnerSelector={setOwnerSelector}
               />
               <AutoTrustOwner
                  options={options}
                  register={register}
                  secondTable={secondTable}
                  trustOwnerStatus={trustOwnerStatus}
                  setTrustOwnerSelector={setTrustOwnerSelector}
               />

               <div className='submit-buttons'>
                  <button className='client_submit reset' type='button'>
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

export default Transport