import { useState } from 'react'
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import './style.css'


function ContainerView({ paths }) {
   const [index, setIndex] = useState(-1);

   return (
      <div>
         {paths?.length !== 0 ?
            <>
               <p className='photo_text'>Rasmlar</p>
               <div className='taminot_photo_add'>
                  <div className='photo_images'>
                     {
                        paths?.map((image, index) => {
                           return (
                              <div className='image_container' key={index}>
                                 <img
                                    width="200"
                                    alt={'Rasm yuklanmadi'}
                                    className='photo_show'
                                    style={{ objectFit: 'contain' }}
                                    src={`${process.env.REACT_APP_BASE_URL}/${image}`}
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
                  carousel={
                     {
                        finite: true,
                        preload: 2,
                     }
                  }
                  close={() => setIndex(-1)}
                  plugins={[Zoom]}
                  slides={paths?.map(item => {
                     return { src: `${process.env.REACT_APP_BASE_URL}/${item}` }
                  })}
               />
            </> : <></>
         }
      </div>
   )
}

export default ContainerView