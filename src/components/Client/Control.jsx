import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function Control({ id }) {
   return (
      <div className="control_btns">
         <ul className="control_btns_list">
            <li>
               <Link className="edit_client_btn control_btn" to={`/clients/${id}/`}>
                  <span>
                     <FaEdit />
                  </span>
                  <article>
                     O'zgartirish
                  </article>
               </Link>
            </li>
         </ul>
      </div>
   )
}