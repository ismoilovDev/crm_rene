import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
// Components
import { Input } from '@nextui-org/react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { NumericFormat } from 'react-number-format';
import { alert } from '../Alert/alert';
import https from '../../services/https';
// Style
import './style.scss'
import '../Input/style.scss'

export const OpenContractForm = ({ clientID, open, setOpen, contracts, setContracts }) => {
    const default_value = {
       sum: 0,
       start_date: "",
       end_date: ""
    }
    const modal = useRef(null)
    const { register, handleSubmit } = useForm();
    const [value, setValue] = useState(default_value)
 
    const closeModal = (e) => {
        if (e.target === modal.current) {
            setOpen(false)
            document.body.style.overflowY = 'scroll'
        }
    }
 
    const addOpenContractHandle = async (data) => {
        const info = { ...value, client_id: clientID };
        try {
            const response = await https.post('/open-contracts', info)
            document.body.style.overflowY = 'auto';
            setOpen(false)
            setValue(default_value)
            setContracts([...contracts, response?.data])
            alert("Qo'shildi", 'success')
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
                <form onSubmit={handleSubmit(addOpenContractHandle)}>
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
                        {...register("start_date", { required: true })}
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
                        {...register("end_date", { required: true })}
                        onChange={(e) => {
                        const newObject = { ...value }
                        newObject.end_date = e.target.value
                        setValue(newObject)
                        }}
                    />
                    <div className="contracts_submit margin_top_15">
                        <button type='submit'>Kiritish</button>
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