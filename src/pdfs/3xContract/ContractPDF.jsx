import { useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { MainPart, Part1, Part2, Part3, Part4, Part5, Part6, Part7, Part8, Part9, Part10, Part11, Part12, Part13, Part14 } from './Parts';
import { PdfWrapper } from '../../components/Pdf/Wrapper';
import { ContractForm } from './ContractForm';
import { PdfControls } from '../../components/Pdf/PdfControls';
import https from '../../services/https'
import './style.scss';


function ContractPDF() {
   const location = useLocation()
   const orderId = location?.state?.id
   const [orderInfo, setOrderInfo] = useState({})
   const [documentInfo, setDocumentInfo] = useState({})

   async function getContractData() {
      try {
         const res = await https.post(`/s1/${orderId}`, {})
         const { data } = res;
         setDocumentInfo(data)
         console.log(data);
      }
      catch (err) {
         console.log(err);
      }
   }

   async function getOrderData() {
      try {
         const res = await https.get(`/orders/${orderId}`)
         const { data } = res;
         setOrderInfo(data)
         console.log(data);
      }
      catch (err) {
         console.log(err);
      }
   }

   useMemo(() => {
      getContractData()
      getOrderData()
   }, [])

   return (
      <>
         <PdfControls />
         <PdfWrapper>
            <MainPart documentInfo={documentInfo} orderInfo={orderInfo} />
            <Part1 documentInfo={documentInfo} />
            <Part2 documentInfo={documentInfo} />
            <Part3 orderInfo={orderInfo} />
            <Part4 />
            <Part5 />
            <Part6 />
            <Part7 />
            <Part8 />
            <Part9 />
            <Part10 />
            <Part11 />
            <Part12 />
            <Part13 />
            <Part14 >
               <ContractForm documentInfo={documentInfo} />
            </Part14>
         </PdfWrapper>
      </>
   )
}

export default ContractPDF;