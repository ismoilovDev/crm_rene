import React, { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Blank from './Blank'
import Adding_VVB from './AddingVVB'
import https from '../services/https'
import Logo from '../assets/images/Logo'
import { monthDiff } from './Parts/functions'
import fullName from '../utils/functions/fullName'
import { Address, DocInfo } from './Parts/personal'
import { PdfWrapper } from '../components/Pdf/Wrapper'  
import dateConvert from '../utils/functions/dateConvert'
import { typeFunc } from '../utils/functions/supplyTypes'
import useDataFetching from '../hooks/usePdfDataFetching'
import { PdfControls } from '../components/Pdf/PdfControls'


const user_name = window.localStorage.getItem('name')

const part1 = (documentInfo, orderInfo) =>{
    return(
       <p className='distance pdf_margin_top_20'>Men, {documentInfo?.client?.name}, Sizdan {orderInfo?.open_contract?.sum?.toLocaleString()} so‘m miqdorda ochiq liniyali mikroqarz ajratish
     bo‘yicha {monthDiff(new Date(orderInfo?.open_contract?.start_date), new Date(orderInfo?.open_contract?.end_date))} oy muddatga bosh kelishuv bitimi tuzishingizni so‘rayman.
    </p>  
    )
}

const logoPart = (documentInfo) =>(
    <div className='header_logo'>
        <Logo width={200} />
        <div className='b1_subtitle'>
            <div className='endColumn'>
            <span>{documentInfo?.branch?.name} Boshqaruvchisi {Adding_VVB(documentInfo?.branch?.id) ? 'v.v.b' : ''}</span>
            <span>{fullName(documentInfo?.branch?.head)} ga</span>
            </div>
        </div>
    </div>
)

const endPart = (documentInfo) =>(
    <>
        <div className='margin_top_20'>
            <div className='between margin_top_10 align_end name_handmark'>
                <p className='text_black_18'>
                {documentInfo?.client?.name}
                </p>
                <div></div>
            </div>
        </div>
        <div className='b1_end'>
            <p className='margin_top_10'>{dateConvert(documentInfo?.order?.order_date)}</p>
        </div>
    </>
)

function B5Form() {
    const location = useLocation()
    const orderId = location?.state?.id
    const { data: documentInfo } = useDataFetching(`/b1/${orderId}`)
    
    const [orderInfo, setOrderInfo] = useState()

    async function gerOrderData(){
        try{
            const res = await https.get(`/orders/${orderId}`)
            const { data } = res;
            setOrderInfo(data)
            console.log(data);
        }
        catch(err){
            console.log(err)
        }
    }

    useMemo(()=>{
        gerOrderData()
    },[orderId])

    return (
        <>
            <PdfControls/>
            <PdfWrapper indicator={documentInfo}>
                <div className="pdf_header_blank">
                    <Blank
                        user_name={fullName(user_name)}
                        order_date={dateConvert(documentInfo?.order?.order_date) || ""}
                        boss={fullName(documentInfo?.branch?.head) || ""}
                        vvb={Adding_VVB(documentInfo?.branch?.id) ? 'v.v.b' : ''}
                    />
                    {logoPart(documentInfo)}
                </div>
                <h1 className='text_black_18 text_center pdf_margin_top_30'>Ariza -- <span className='black_text'>{orderInfo?.open_contract?.code}</span></h1>
                {part1(documentInfo, orderInfo)}
                <p className='pdf_margin_top_20 distance'><Address info={documentInfo?.client}/> <DocInfo info={documentInfo?.client}/></p>
                <p className='pdf_margin_top_20'>Mikroqarz qaytarilishini {typeFunc(documentInfo?.supply_types?.[0]?.type)}  bilan ta'minlayman.</p>
                {endPart(documentInfo)}
            </PdfWrapper>
        </>
    )
}

export default B5Form