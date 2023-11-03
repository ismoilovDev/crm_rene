import React, { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import https from '../services/https'
import { AutoTable } from './Parts/tables'
import { Address, DocInfo } from './Parts/personal'
import { PdfWrapper } from '../components/Pdf/Wrapper'
import dateConvert from '../utils/functions/dateConvert'
import { PdfControls } from '../components/Pdf/PdfControls'
import { phoneFormat } from '../utils/functions/phoneFormat'


function CheckOwner(taminot){
    if(taminot?.possessor === 'trust_owner'){
        return taminot?.trust_owner
    }else if(taminot?.possessor === 'owner'){
        return taminot?.owner
    }else if(taminot?.possessor === 'client'){
        return false
    }
}

function DLForm() {

    const location = useLocation()
    const orderId = location?.state?.id
    const [ documentInfo, setDocumentInfo ]= useState({})

    async function getData(){
        try{
            const res = await https.post(`/lifting-the-ban/${orderId}`)
            const { data } = res;
            setDocumentInfo(data)
            console.log(data);
        }
        catch(err){
            console.log(err);
        }

    }

    useMemo(()=>{
        getData()
    }, [orderId])

    return (
        <>
            <PdfControls/>
            <PdfWrapper indicator={documentInfo}>
                <p className='text_black_18 text_center'>
                    Transport vositasini ko'zdan kechirish
                </p>
                <p className='text_black_18 text_center pdf_margin_top_5'>
                    D A L O L A T N O M A S I
                </p>
                <div className='between align_center pdf_margin_top_20'>
                    <p className='black_text'>{documentInfo?.branch?.city}</p>
                    <p className='black_text'>{dateConvert(documentInfo?.contract?.contract_issue_date)} yil</p>
                </div>
                <div className='pdf_margin_top_20'>
                    Quyidagi Jadval №1 da keltirilgan {documentInfo?.client?.name} (<DocInfo info={documentInfo?.client} /> <Address info={documentInfo?.client}/>) hamda "Renesans Mikromoliya Tashkiloti"    
                    MChJ {documentInfo?.branch?.short_name} o'rtasida tuzilgan {dateConvert(documentInfo?.contract?.contract_issue_date)} y. dagi {documentInfo?.contract?.contract_num}-sonli Shartnomaga asosan ta'minot sifatida
                    garov uchun taqdim etilgan {CheckOwner(documentInfo?.supply_infos?.[0]) ? CheckOwner(documentInfo?.supply_infos?.[0])?.fio : documentInfo?.client?.name}ga tegishli bo'lgan transport
                    vositasini ko'zdan kechirish jarayonida garov mulki shikastlanmaganligi, u bilan bogliq yo‘l
                    transport xodisalari bo'lmaganligi, bugungi kunda but va yaxshi xolatda ekanligiga aniqlandi.
                </div>
                <div className='margin_top_15'>
                    <p>Jadval №1</p>
                    <AutoTable auto={documentInfo?.supply_infos?.[0]?.auto} />
                </div>
                <div className='pdf_margin_top_20'>
                    <p>Yuqoridagi dalolatnomani tasdiqlaymiz:</p>
                    <div className='between margin_top_15'>
                        <p>Monitoring bo'limi xodimi:</p>
                        <p>______________________________________</p>
                    </div>
                    <div className='margin_top_15'>
                        <p>Garovga qo'yuvchi:</p>
                        <div className='berween margin_top_5'>
                            <p>{CheckOwner(documentInfo?.supply_infos?.[0]) ? CheckOwner(documentInfo?.supply_infos?.[0])?.fio : documentInfo?.client?.name}</p>
                            <p className='margin_top_15'>_______________</p>
                        </div>
                        <div className='berween margin_top_15'>
                            <p>tel: {CheckOwner(documentInfo?.supply_infos?.[0]) ? CheckOwner(documentInfo?.supply_infos?.[0])?.phone : documentInfo?.client?.phone?.join(' ')}</p>
                        </div>
                    </div>
                </div>
            </PdfWrapper>
        </>
    )
}

export default DLForm