import { useState } from 'react'
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import { base_url } from '../../utils/const';
import "yet-another-react-lightbox/styles.css";
import './style.css'


function ContainerView({ paths }) {
   const [isActivePopup, setIsActivePopup] = useState(false);
   const [index, setIndex] = useState(-1);

   return (
      <div>
         {paths?.length != 0 ?
            <>
               <p className='photo_text'>Rasmlar</p>
               <div className='taminot_photo_add'>
                  <div className='photo_images'>
                     {
                        paths?.map((image, index) => {
                           return (
                              <div className='image_container' key={index}>
                                 <img
                                    className='photo_show'
                                    width="200"
                                    style={{ objectFit: 'contain' }}
                                    src={`${base_url}/${image}`}
                                    onClick={() => setIndex(index)}
                                 ></img>
                              </div>
                           )
                        })
                     }
                  </div>
               </div>
               <Lightbox
                  open={index >= 0}
                  index={index}
                  close={() => setIndex(-1)}
                  plugins={[Zoom]}
                  slides={paths?.map(item => {
                     return { src: `${base_url}/${item}` }
                  })}
               />
               {
                  isActivePopup ?
                     <div className="popup">
                        <div className="loadingio-spinner-rolling-142tch8axj4">
                           <div className="ldio-9k6j014ej1">
                              <div></div>
                           </div>
                        </div>
                     </div>
                     : null
               }
            </> : <></>
         }
      </div>
   )
}

export default ContainerView