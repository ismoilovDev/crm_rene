import React, { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Adding_VVB from './AddingVVB'
import https from '../services/https'
import AddingVVBbug from './AddingVVBbug'
import { monthDiff } from './Parts/functions'
import fullName from '../utils/functions/fullName'
import { AutoTable, GoldTable } from './Parts/tables'
import { PdfWrapper } from '../components/Pdf/Wrapper'
import { typeFunc } from '../utils/functions/supplyTypes'
import useDataFetching from '../hooks/usePdfDataFetching'
import { PdfControls } from '../components/Pdf/PdfControls'
import './pdf.css'


function typesSupply(supply){
    let types = []
    supply?.map(item =>{
        if(!types.includes(typeFunc(item?.type)) && item?.type){
            types.push(typeFunc(item))
        }
    })
    return types
}

function checkOwnerClient(item){
    if(item?.possessor == 'trust_owner'){
      return item?.trust_owner?.fio
    }else if( item?.possessor == 'owner'){
      return item?.owner?.fio
    }else{
      return("o'zi")
    }
}

const titlePart = (documentInfo, orderInfo) =>(
    <>
        <p className='text_black_18 text_center'>"Renesans Mikromoliya Tashkiloti" MChJ {documentInfo?.branch?.short_name} Kredit Komissiyasining</p>
        <p className='text_black_18 text_center'>{orderInfo?.open_contract?.code} sonli Yig'ilish Bayonnomasi</p>
    </>
)

const city_time_data = (documentInfo) =>(
    <div className='between align_center pdf_margin_top_20'>
        <p className='black_text pdf_margin_top_5'>{documentInfo?.branch?.city}</p>
        <p className='black_text pdf_margin_top_5'>{documentInfo?.order?.protocol_result_date}</p>
    </div>
)

const membersPart = (documentInfo) =>(
    <>
        <div className='between align_center pdf_margin_top_10'>
            <p>Kredit Komissiyasi Raisi</p>
            <p>{Adding_VVB(documentInfo?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.branch?.head_of_branch)}</p>
        </div>
        <div className='between align_center pdf_margin_top_10'>
            <p>Kredit Komissiyasi a'zolari</p>
            <p>{AddingVVBbug(documentInfo?.branch?.id) ? 'v.v.b' : ''} {fullName(documentInfo?.branch?.chief_accountant)}</p>
        </div>
        <div className='between align_center pdf_margin_top_10'>
            <p></p>
            <p>{fullName(documentInfo?.branch?.head_of_credit)}</p>
        </div>
    </>
)

const textPart1 = (documentInfo) =>(
    <p className='pdf_margin_top_30'>
        Kun tartibi: Arizachi {documentInfo?.client?.name}ning ochiq kredit liniyali mikroqarz ajratish bo'yicha berilgan arizasini ko'rib chiqish
    </p>
)

const textPart2 = (documentInfo) =>(
    <p className='pdf_margin_top_20'>
        "Renesans Mikromoliya Tashkiloti" MChJ {documentInfo?.branch?.short_name}ga Arizachi quyidagi shartlarda mikroqarz so'rab murojaat etgan:
    </p>
)

const tableFirst = (documentInfo, orderInfo) =>(
    <table className='pdf_margin_top_5 p1_form_table_1'>
        <tr key={401}>
            <td>№</td>
            <td>F.I.O</td>
            <td>Shaxsini tasdiqlovchi hujjat</td>
            <td>Mikroqarz miqdori</td>
            <td>Muddat</td>
        </tr>
        <tr key={404}>
            <td>{1}</td>
            <td>{documentInfo?.client?.name}</td>
            <td>{documentInfo?.client?.serial_num} raqamli {documentInfo?.client?.doc_type} {documentInfo?.client?.issued_date} da {documentInfo?.client?.issued_by} tomonidan berilgan</td>
            <td>{orderInfo?.open_contract?.sum?.toLocaleString(undefined, {minimumFractionDigits: 2})} so'm</td>
            <td>{monthDiff(new Date(orderInfo?.open_contract?.start_date), new Date(orderInfo?.open_contract?.end_date))} oy</td>
        </tr>
    </table>
)

const textPart3 = (documentInfo) =>(
    <p className='pdf_margin_top_20'>
        {(typesSupply(documentInfo?.supply_infos))?.includes('sugurta') ?
        `Arizachi mikroqarz qaytarilishini ta'minlash maqsadida ${documentInfo?.supply_infos?.[0]?.insurance?.company_name} sug'urta kompaniyasining "Kredit qaytarilmasligini sug'urtalash shartnomasi"ga ko'ra xavfni sug'urtalatishi va tegishli sug'urta polisini taqdim etishini ma'lum qilgan`
        : 
        (
            documentInfo?.supply_infos?.[0]?.type =="without_supply" ? 
            "Arizachi o‘zining kredit tarixi hamda qarz oluvchi sifatidagi obro‘sini inobatga olgan xolda, unga mikroqarzni ishonch asosida, hech qanday ta'minotsiz ajratishni so‘ragan."
            :
            `Arizachi mikroqarz qaytarilishini ta'minlash maqsadida garov shartnomasi asosida ${(typesSupply(documentInfo?.supply_infos))?.includes('transport vositasi garovi') ? checkOwnerClient(documentInfo?.supply_infos?.find(x => x?.type == 'auto')) : "o'zi"}ga tegishli bo'lgan ${documentInfo?.supply_infos?.[0] ? typeFunc(documentInfo?.supply_infos?.[0]?.type) : ""}ga qo'yishlarini ma'lum qilgan.`
        )}
    </p>
)

const tableSecond = (documentInfo) =>(
    documentInfo?.supply_infos?.map((item,index)=>{
        if(item?.type === 'auto'){
            return <AutoTable auto={item?.auto} />
        }else if(item?.type === 'gold'){
            return <GoldTable gold={item?.gold} />
        }else{
            return <></>
        }
    })
)

const pointsPart = (documentInfo, orderInfo) =>(
    <>
        <p className='pdf_margin_top_20'>
            Yuqoridagilardan kelib chiqqan holda "Renesans Mikromoliya Tashkiloti" MChJ {documentInfo?.branch?.short_name} Kredit Komissiyasi qaror qiladi:
        </p> 
        <div className='startRow pdf_margin_top_10'>
            <p>1</p>
            <div className='p1_left_space'>
                <p>
                    Bitim uchun qabul qilinadigan garov ta‘minoti, tashkilotga qabul qilingansin yoki notarial tartibda ta‘qiq qo‘yilsin.    
                </p>
            </div>
        </div>
        <div className='startRow pdf_margin_top_20'>
            <p>2</p>
            <div className='p1_left_space'>
                <p>
                    {documentInfo?.client?.name}ga {orderInfo?.open_contract?.sum?.toLocaleString()} so'm {monthDiff(new Date(orderInfo?.open_contract?.start_date), new Date(orderInfo?.open_contract?.end_date))} oy muddatga ochiq kredit liniyali bitim tuzilsin.
                </p> 
            </div>
        </div>
        <div className='startRow pdf_margin_top_20 margin_btn_15'>
            <p>3</p>
            <div className='p1_left_space'>
                <p>
                    Arizachining buyurtmasiga asosan har bir ajratiladigan mikroqarz bo‘yicha alohida mikroqarz shartnomasi tuzilsin.    
                </p>       
            </div>
        </div>
    </>
)



function P3Form() {
    const location = useLocation()
    const orderId = location?.state?.id
    const { data: documentInfo } = useDataFetching(`/p1/${orderId}`)
    const [orderInfo, setOrderInfo] = useState()

    async function getOrderData(){
        try{
            const res = await https.get(`/orders/${orderId}`)
            const { data } = res;
            setOrderInfo(data)
        }
        catch(err){
            console.log(err);
        }
    }

    useMemo(()=>{
        getOrderData()
    }, [orderId])

    return (
        <>
            <PdfControls/>
            <PdfWrapper indicator={documentInfo}>
                {titlePart(documentInfo, orderInfo)}
                {city_time_data(documentInfo)}
                {membersPart(documentInfo)}
                {textPart1(documentInfo)}
                {textPart2(documentInfo)}
                {tableFirst(documentInfo, orderInfo)}
                {textPart3(documentInfo)}
                {tableSecond(documentInfo)}
                {pointsPart(documentInfo, orderInfo)}
                {membersPart(documentInfo)}
            </PdfWrapper>
        </>
    )
}

export default P3Form