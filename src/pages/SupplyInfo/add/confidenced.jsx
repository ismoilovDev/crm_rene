import { useNavigate } from 'react-router';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { alert } from '../../../components/Alert/alert';
import https from '../../../services/https';

function WithoutSupplyInfo({ clientId }) {
  const navigate = useNavigate()

  const onSubmit = async () => {
    const info = {
      client_id: clientId,
      type: 'without_supply'
    }
    try {
      const response = await https.post('/supply-info', info)
      alert("Ta'minot qo'shildi", 'success')
      navigate(-1)
    }
    catch (err) {
      console.log(err)
      alert(err?.response?.data?.message, 'error')
    }
  }

  return (
    <>
      <section className='sugurta_section'>
        <div className='submit-buttons'>
          <h1>Ishonch asosida</h1>
          <button type='button' onClick={onSubmit} className='client_submit submit'>
            Qo'shish
            <AiOutlineUserAdd />
          </button>
        </div>
      </section>
    </>
  )
}

export default WithoutSupplyInfo