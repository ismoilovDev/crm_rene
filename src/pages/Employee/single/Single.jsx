import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Radio } from '@nextui-org/react'
import { InputSingle } from '../../../components/Input/InputSingle';
import ContainerView from '../../../components/ImageContainer/ContainerView';
import Prev from '../../../components/Prev/Prev';
import https from '../../../services/https';

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

   useEffect(() => {
      getEmployeeDetails()
      async function getEmployeeDetails() {
         try {
            const { data } = await https.get(`/employees/${id}`)
            setEmployees(data)
            let arr = [];
            arr.push(data?.photo);
            setPath(arr)
         } 
         catch (err) {
            console.log(err);
         }
      }
   }, [id])

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
               </div>
            </div>
         </div>
      </section>
   )
}

export default EmployeeSingle