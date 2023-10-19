import dateConvert from "../../utils/functions/dateConvert";
import { phoneFormat } from "../../utils/functions/phoneFormat";

export function ClientDetailsList({ client }) {

   function calculateAge(birthdate) {
      const birthdateObj = new Date(birthdate);
      const currentDate = new Date();

      const yearDiff = currentDate.getFullYear() - birthdateObj.getFullYear();
      const monthDiff = currentDate.getMonth() - birthdateObj.getMonth();
      const dayDiff = currentDate.getDate() - birthdateObj.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
         return yearDiff - 1;
      } else {
         return yearDiff;
      }
   }

   return (
      <div className="client_details_list">
         <ul>
            <li>
               <span className='list_title'>
                  Tug'ilgan sana:
               </span>
               <span>
                  {dateConvert(client?.birth_date)} --- ({calculateAge(client?.birth_date)} yosh)
               </span>
            </li>
            <li>
               <span className='list_title'>
                  Ish lavozmi:
               </span>
               <span>
                  {client?.job}
               </span>
            </li>
            <li>
               <span className='list_title'>
                  Hujjat turi:
               </span>
               <span>
                  {client?.doc_type}
               </span>
            </li>
            <li>
               <span className='list_title'>
                  Hujjat seriya raqami:
               </span>
               <span>
                  {client?.serial_num}
               </span>
            </li>
            <li>
               <span className='list_title'>
                  PINFL:
               </span>
               <span>
                  {client?.pinfl}
               </span>
            </li>
            <li>
               <span className='list_title'>
                  Doimiy manzili:
               </span>
               <span>
                  {client?.region?.name_uz}, {client?.district?.name_uz} {client?.address}
               </span>
            </li>
            <li>
               <span className='list_title'>
                  {`Telefon raqam${client?.phone?.length > 1 ? 'lari' : 'i'}`}:
               </span>
               <div className="phones">
                  {
                     client?.phone?.map(item => (
                        <span key={item}>{phoneFormat(item)}</span>
                     ))
                  }
               </div>
            </li>
         </ul>
      </div>
   )
}