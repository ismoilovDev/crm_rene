import { memo, useState } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { alert } from '../Alert/alert';
import LoaderBackdrop from '../Loader/LoaderBackdrop'
import https from '../../services/https';

function DeleteWarning({ id, path, list, setList, successText, openClose, setOpenClose }) {
    const [disable, setDisable] = useState(false)

    function deleteItem() {
        setDisable(true)
        https
            .delete(`/${path}/${id}`)
            .then(_ => {
                setList(list?.filter(item => item?.id !== id))
                setOpenClose('close')
                setDisable(false)
                alert(successText, 'success')
            })
            .catch(err => console.log(err))
    }
    
    return (
        <>
            <div className={`delete_warning ${openClose}`}>
                <AiOutlineWarning className='warning_icon' />
                <p className='main_text'>Aniq o‘chirishni xohlaysizmi?</p>
                <p className='extra_text'>O‘chirilgan ma‘lumotni tiklashning imkoni yo‘q!</p>
                <div>
                    <button onClick={deleteItem}>Ha, o‘chirish</button>
                    <button onClick={() => { setOpenClose('close') }}>Yo‘q, bekor qilish</button>
                </div>
            </div>
            <LoaderBackdrop disable={disable} />
        </>
    )
}

export default memo(DeleteWarning)