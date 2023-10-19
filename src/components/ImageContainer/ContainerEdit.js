import { useState, useRef, useCallback, useEffect, memo } from 'react';
import { WebCamera } from './WebCamera';
import { Zoom } from "yet-another-react-lightbox/plugins";
import { MdPhotoSizeSelectLarge } from "react-icons/md";
import { AiFillCamera, AiFillCloseSquare } from 'react-icons/ai';
import Lightbox from "yet-another-react-lightbox";
import { base_url } from '../../utils/const';
import { alert } from "../Alert/alert"
import axios from 'axios';
import "yet-another-react-lightbox/styles.css";
import './style.css'


const ContainerEdit = memo(({ path, setPath }) => {
   const cameraWrap = useRef(null)
   const imageInput = useRef(null)
   const [index, setIndex] = useState(-1);
   const [openCamera, setOpenCamera] = useState(false)
   const [isChanged, setIsChanged] = useState(false)
   const [sourceImages, setSourceImages] = useState([])
   const [isOpenField, setIsOpenField] = useState(false)
   const [selectedImages, setSelectedImages] = useState([])
   const [isActivePopup, setIsActivePopup] = useState(false)

   useEffect(() => {
      setTimeout(() => {
         setSourceImages([...path])
      }, 1000);
   }, [path])

   function photoOpen() {
      setIsOpenField(true)
      imageInput.current.click()
   }

   function openCameraHandle() {
      setOpenCamera(true)
      document.body.style.overflow = 'hidden'
   }

   function closeCameraHandle(e, type) {
      if (type === 'wrap' || e.target === cameraWrap.current) {
         setOpenCamera(false)
         document.body.style.overflow = 'auto'
      }
   }

   const handleImageChange = useCallback((event) => {
      const { files } = event.target;
      const allowedSize = 5 * 1024 * 1024;
      const images = [];
      const sourse = [];
      for (const file of files) {
         if (file.size <= allowedSize && /(png|jpe?g)$/.test(file.type)) {
            setIsChanged(true)
            const image = {
               src: URL.createObjectURL(file)
            };
            images.push(image);
            sourse.push(file);
         } else {
            alert(`${file.name} fayl hajmi 5 mbdan katta yoki rasm png, jpg, jpeg farmatida emas`);
         }
      }
      setSelectedImages([...images, ...selectedImages]);
      setSourceImages([...sourse, ...sourceImages]);
   }, [selectedImages, sourceImages]);

   const addImage = async () => {
      console.log(sourceImages)
      const images = new FormData()
      if (sourceImages.length > 0) {
         setIsActivePopup(true)
         document.body.style.overflowY = 'hidden'
         sourceImages.forEach((image, i) => {
            images.append(`image[${i}]`, image);
         });
         console.log(images)
         await axios.post(`${base_url}/api/upload-photo`, images, {
            headers: {
               "Authorization": "Bearer " + window.localStorage.getItem('token'),
               "Content-Type": "multipart/form-data",
            }
         })
            .then(res => {
               setIsActivePopup(false)
               setPath(res?.data?.data)
               setSourceImages(res?.data?.data)
               alert("Rasmlar qo'shildi", 'success', 1500)
               setTimeout(() => {
                  document.body.style.overflowY = 'scroll'
               }, 1550);
            })
            .catch(err => {
               setIsActivePopup(false)
               alert(err?.response?.data?.message, 'error', 1500)
               setTimeout(() => {
                  document.body.style.overflowY = 'scroll'
               }, 1550);
            })
      } else {
         alert('Rasm tanlang!', 'error')
      }
   }

   function imageDelete(id) {
      const newSelectedImages = selectedImages.filter((_, i) => i !== id);
      const newSourceImages = sourceImages.filter((_, i) => i !== id);
      if (isChanged) {
         const newPath = path.filter((_, i) => i !== id);
         setPath([...newPath])
      }
      setSelectedImages([...newSelectedImages])
      setSourceImages([...newSourceImages])
   }

   return (
      <>
         <p className='photo_text'>Rasmlar</p>
         <div className='taminot_photo_add'>
            <div className='photo_add_buttons'>
               <button type='button' onClick={openCameraHandle}>
                  Rasmga olish <AiFillCamera className='icon_load' />
               </button>
               <button type='button' onClick={photoOpen}>
                  Rasm tanlash <MdPhotoSizeSelectLarge className='icon_load' />
               </button>
               {
                  isChanged ? 
                     <button type='button' onClick={addImage}>
                        Rasmlarni yuklash <MdPhotoSizeSelectLarge className='icon_load' />
                     </button> :
                     null
               }
            </div>
            <input ref={imageInput} type="file" accept="image/*" multiple onChange={handleImageChange} />
            <div className='photo_images'>
               {
                  path?.length > 0 ?
                     path?.map((image, index) => {
                        return (
                           <div className='image_container' key={index}>
                              <img
                                 className='photo_show'
                                 width="200"
                                 style={{ objectFit: 'contain' }}
                                 src={`${base_url}/${image}`}
                                 onClick={() => setIndex(index)}
                              />
                              <button type='button' onClick={() => { imageDelete(index) }}><AiFillCloseSquare className='icon_no' /></button>
                           </div>
                        )
                     }) : null
               }
               {
                  selectedImages?.map((image, index) => {
                     return (
                        <div className='image_container' key={index}>
                           <img
                              className='photo_show'
                              src={image.src}
                              width="200"
                              style={{ objectFit: 'contain' }}
                              onClick={() => setIndex(index)}
                           />
                           <button type='button' onClick={() => { imageDelete(index, false) }}>
                              <AiFillCloseSquare className='icon_no' />
                           </button>
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
            slides={!isOpenField ? path?.map(item => {
               return { src: `${base_url}/${item}` }
            }) : selectedImages}
         />
         <WebCamera
            open={openCamera}
            cameraWrap={cameraWrap}
            setIsChanged={setIsChanged}
            sourceImages={sourceImages}
            selectedImages={!isOpenField ? path?.map(item => {
               return { src: `${base_url}/${item}` }
            }) : selectedImages}
            setSourceImages={setSourceImages}
            setSelectedImages={setSelectedImages}
            closeCameraHandle={closeCameraHandle}
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
      </>
   )
})

export default ContainerEdit