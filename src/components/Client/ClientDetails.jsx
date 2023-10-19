import { useState, useContext } from 'react';
import { useLocation } from 'react-router';
import Alert from '@mui/material/Alert';
import { ClientContext } from '../../context/context';


export function ClientDetails() {
   const { client } = useContext(ClientContext)
   const [status, setStatus] = useState(false)
   const paths = useLocation()?.pathname.split('/')

   const handleCopyClick = () => {
      setStatus(true)
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = client?.code;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
      setTimeout(() => {
         setStatus(false)
      }, 1000);
   };

   return (
      <div className="client_details">
         {
            status ?
               <div className='alert_status'>
                  <Alert severity="success">Nusxalandi!!!</Alert>
               </div>
               : <></>
         }
         <h2 className={paths[3] ? 'client_name_sm' : ''}>
            {client?.surname + " " + client?.firstname + " " + client?.lastname}
            <span onClick={handleCopyClick} style={{ cursor: 'pointer' }} className="cleint_code">
               {client?.code}
            </span>
         </h2>
      </div>
   )
}
