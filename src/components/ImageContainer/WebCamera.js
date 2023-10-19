import { memo, useEffect, useRef } from "react";
import { Tooltip } from '@nextui-org/react'
import Webcam from 'react-webcam';
import { AiFillCamera } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

export const WebCamera = memo(({ open, cameraWrap, sourceImages, selectedImages, setSourceImages, setSelectedImages, closeCameraHandle, setIsChanged }) => {
   
   const webcamRef = useRef(null)
   const captureImage = () => {
      if (webcamRef.current) {
         const imageSrc = webcamRef.current.getScreenshot();
         const image = {
            src: imageSrc,
         }
         setIsChanged(true)
         setSelectedImages([...selectedImages, image])
         const base64Image = imageSrc.split(',')[1];
         const blob = dataURItoBlob(base64Image);

         const file = new File([blob], 'captured-image.png', { type: 'image/png' });
         setSourceImages([...sourceImages, file])
      }
   }

   const dataURItoBlob = (dataURI) => {
      const byteString = atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
         uint8Array[i] = byteString.charCodeAt(i);
      }

      return new Blob([arrayBuffer], { type: 'image/png' });
   };

   return (
      <>
         {
            open ?
               <div ref={cameraWrap} className="camera_wrap" onClick={closeCameraHandle}>
                  {
                     <div className="camera">
                        <Webcam
                           audio={false}
                           ref={webcamRef}
                           screenshotFormat="image/jpeg"
                        />
                        <Tooltip onClick={e => closeCameraHandle(e, 'wrap')} className="cancel_btn" content="Orqaga" placement="topStart">
                           <button type="button">
                              <MdOutlineCancel />
                           </button>
                        </Tooltip>
                        <Tooltip className="capture_btn" content="Rasmga olish" placement="topStart">
                           <button type="button" onClick={captureImage}>
                              <AiFillCamera />
                           </button>
                        </Tooltip>
                     </div>
                  }
               </div>
               : null
         }
      </>
   )
})