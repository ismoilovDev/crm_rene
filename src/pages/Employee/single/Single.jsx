import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Radio } from '@nextui-org/react'
import Select from 'react-select';
import https from '../../../services/https';
import Prev from '../../../components/Prev/Prev';
import { InputSingle } from '../../../components/Input/InputSingle';
import ContainerView from '../../../components/ImageContainer/ContainerView';
import { makeTheme, customStyles } from '../../../components/Order/Functions'

const positions = [
   {
      value: 'chief_treasurer',
      label: "Bosh g'aznachi"
   },
   {
      value: 'head_of_credit',
      label: "Bosh kreditor"
   },
   {
      value: 'chief_accountant',
      label: "Bosh buxgalter"
   },
   {
      value: 'head_of_branch',
      label: "Boshqaruvchi"
   },
   {
      value: null,
      label: "Hechkim"
   }
]

function EmployeeSingle() {
   const { id } = useParams();
   const [employees, setEmployees] = useState({})
   const [path, setPath] = useState([])
   const [workerOptions, setWorkerOptions] = useState({})
   const [worker, setWorker] = useState([])

   async function fetchWorkers() {
      try{
         const res = await https.get('/employees-all')
         let selectWorkers = []
         res?.data?.map((item) => {
            selectWorkers.push(
               { value: item?.id, label: item?.name }
            )
         })
         setWorkerOptions(selectWorkers)
         setWorker(selectWorkers[0])
      }
      catch(err){
         console.log(err)
      }
   }

   async function getData(){
      try{
         const res = await https.get(`/employees/${id}`)
         const { data } = res;
         setEmployees(data)
         setPath(data?.photo)
         console.log(res?.data);
      }
      catch(err){
         console.log(err);
      }
   }

   useEffect(() => {
      getData()
      fetchWorkers()
   }, [id])

   const changeEmployee = async (status) =>{
      const data = {
         first_employee_id: employees?.id,
         second_employee_id: worker?.value,
         position: employees?.position,
         is_vvb: status
      }
      console.log(data, 'data');

      try{
         const res = await https.post('/users/setVVB', data)
         if(res?.status===200 || res?.status===201){
            alert("O'zgartirildi", "success")
         }
         getData()
      }
      catch(err){
         console.log(err);
      }
   }

   return (
      <section>
         <div className='filialform_header'>
            <Prev />
         </div>
         <div className=' single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{employees?.name}</h1>
            <div className='pdf_margin_top_15'>
               <div className='single_buyurtma_info'>
                  <InputSingle label={"F.I.Sh:"} value={employees?.name} />
                  {
                     employees?.gender ?
                        <Radio.Group orientation="horizontal" label="Jinsi:" defaultValue={employees?.gender} value={employees?.gender} className='radio_group margin_bottom_15'
                        >
                           <Radio value="male" color="secondary" size="sm">
                              Erkak
                           </Radio>
                           <Radio value="female" color="secondary" size="sm" className='radio_second'>
                              Ayol
                           </Radio>
                        </Radio.Group>
                        : <></>
                  }
                  <InputSingle label={"Pasport raqami:"} value={employees?.passport_data} />
                  <InputSingle label={"PINFL:"} value={employees?.pinfl} />
                  <InputSingle label={"Tajriba:"} value={employees?.staj} />
                  <InputSingle label={"Stavka:"} value={employees?.stavka} />
                  {
                     employees?.graduation ?
                        <Radio.Group orientation="horizontal" label="Oliy ta'lim:" defaultValue={employees?.graduation} value={employees?.graduation} className='radio_group margin_bottom_15'
                        >
                           <Radio value={true} color="secondary" size="sm">
                              Bor
                           </Radio>
                           <Radio value={false} color="secondary" size="sm" className='radio_second'>
                              Yok
                           </Radio>
                        </Radio.Group>
                        : <></>
                  }
                  <InputSingle label={"Shartnoma sanasi:"} value={employees?.contract_date} />
                  <InputSingle label={"Shartnoma turi:"} value={employees?.contract_type} />
                  <InputSingle label={"Lavozim:"} value={employees?.job} />
                  <InputSingle label={"Kod:"} value={employees?.code} />
                  {
                     employees?.position ?
                        <div className='single_buyurtma_inputs'>
                           <p>Kommisiya:</p>
                           <p>{positions?.find(x => x.value == employees?.position).label}</p>
                        </div> :
                        <div className='single_buyurtma_inputs'>
                           <p>Kommisiya:</p>
                           <p>Qo'mita azosi emas</p>
                        </div>

                  }
                  <InputSingle label={"Filial:"} value={employees?.branch_name} />
                  <InputSingle label={"Bo'lim:"} value={employees?.section_name} />
                  <p className='margin_top_15'></p>
                  <ContainerView paths={path} />
                  {
                     employees?.position ?
                     <div className='vvb_container'>
                        <h4>Bu lavozimga boshqa xodim qo'yish</h4>
                        <div className='order-select margin_top_15'>
                           <p>Xodimlar:</p>
                           <Select
                              width='100%'
                              defaultValue={worker}
                              value={worker}
                              options={workerOptions}
                              className='xodim_select basic-multi-select'
                              classNamePrefix="select"
                              styles={customStyles}
                              theme={makeTheme}
                              onChange={(event) => { setWorker(event) }}
                           />
                        </div>
                        <div className='buttons'>
                           <button onClick={()=>{changeEmployee(false)}}>Doimiy</button>
                           <button onClick={()=>{changeEmployee(true)}}>Vaqtinchalik</button>
                        </div>
                     </div> : <></>
                  }
               </div>
            </div>
         </div>
      </section>
   )
}

export default EmployeeSingle