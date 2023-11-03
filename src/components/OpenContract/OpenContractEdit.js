import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// Components
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { NumericFormat } from 'react-number-format';
import { Input } from '@nextui-org/react';
import { alert } from '../Alert/alert';
import https from '../../services/https';
// Style
import './style.scss'
import '../Input/style.scss'

export const OpenContractEdit = ({ clientID, open, setOpen, editContract, contracts, setContracts}) => {
    const modal = useRef(null)
    const { handleSubmit } = useForm();
    const [value, setValue] = useState({})
 
    const closeModal = (e) => {
        if (e.target === modal.current) {
            setOpen(false)
            document.body.style.overflowY = 'scroll'
        }
    }

    async function recollectArray(info){
        const newArr = await contracts?.map(item=>{
            if(item?.id===info.id){
                return info;
            }
            return item;
        })
        setContracts(newArr)
    }

    useEffect(()=>{
        setValue(editContract)
    },[editContract])

    const editOpenContractHandle = async (data) => {
        const info = { 
            id: value?.id,
            code: value?.code,
            sum: value?.sum,
            start_date: value?.start_date,
            end_date: value?.end_date,
            client_id: clientID
        }

        try {
            const response = await https.patch(`/open-contracts/${value?.id}`, info)
            document.body.style.overflowY = 'auto';
            setOpen(false)
            alert("O'zgartirildi", 'success')
            recollectArray(info)
        }
        catch (error) {
            console.log(error);
            alert(error?.response?.data?.message, 'error')
        }
    }
 
 
    return (
        <article
            ref={modal}
            onClick={(e) => closeModal(e)}
            className={ !open ? 'open_contracts' : 'open_contracts active'}
        >
            <div className="open_contracts_container">
                <form onSubmit={handleSubmit(editOpenContractHandle)}>
                    <div className="numeric_format_input width_100 border_radius_10">
                        <label>Bosh kelishuv summasi</label>
                        <NumericFormat
                        thousandSeparator={' '}
                        value={value?.sum}
                        onChange={(e) => {
                            const changed_number = Number((e.target.value).replace(/\s/g, ''))
                            const newObject = { ...value }
                            newObject.sum = changed_number
                            setValue(newObject)
                        }}
                        />
                    </div>
                    <Input
                        bordered
                        label="Bosh kelishuv boshlanish sanasi"
                        color="secondary"
                        type='date'
                        width='100%'
                        className="width_100 margin_bottom_20"
                        value={value?.start_date}
                        onChange={(e) => {
                            const newObject = { ...value }
                            newObject.start_date = e.target.value
                            setValue(newObject)
                        }}
                    />
                    <Input
                        bordered
                        label="Bosh kelishuv tugash sanasi"
                        color="secondary"
                        type='date'
                        className="width_100 margin_bottom_20"
                        width='100%'
                        value={value?.end_date}
                        onChange={(e) => {
                            const newObject = { ...value }
                            newObject.end_date = e.target.value
                            setValue(newObject)
                        }}
                    />
                    <div className="contracts_submit margin_top_15">
                        <button type='submit'>O'zgarishni kiritish</button>
                    </div>
                </form>
                <div
                    className="close_btn"
                    onClick={() => {
                        setOpen(false)
                        document.body.style.overflowY = 'scroll'
                    }}>
                    <AiOutlineCloseCircle />
                </div>
            </div>
       </article>
    )
}