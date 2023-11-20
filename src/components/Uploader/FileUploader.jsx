import React, { memo } from "react";
import { ImUpload2 } from "react-icons/im"
import LoaderBackdrop from "../Loader/LoaderBackdrop";

export const FileUploader = memo(({ handleUpload, handleFileSelect, uploadProgress, uploadComplete, selectedFile, disable, isDoc, handleTypeChange }) => {

   return (
      <React.Fragment>
         <div className='file_uploader'>
            <div className="uploader_box">
               <form onSubmit={handleUpload}>
                  {
                     isDoc &&
                     <div className="type_box">
                        <label className="type_label" htmlFor="type">Hujjat turi:</label>
                        <input type="search" required id="type" onChange={handleTypeChange} />
                     </div>
                  }
                  <input type="file" required id='file-upload' onChange={handleFileSelect} />
                  <label className="file_label" htmlFor="file-upload">
                     <div className="upload_section">
                        <div className="uploader_icon">
                           <ImUpload2 />
                        </div>
                        <p>Fayl tanlash</p>
                     </div>
                     {uploadProgress > 0 && !uploadComplete && (
                        <div className="progress-bar">
                           <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                     )}
                     <span>
                        <i>{selectedFile?.name}</i>
                     </span>
                  </label>
                  {
                     selectedFile.name ?
                        <div className="file_submit">
                           <button className="file_submit_btn" type='submit'>Fayl yuklash</button>
                        </div>
                        : null
                  }
               </form>
            </div>
         </div>
         <LoaderBackdrop disable={disable} />
      </React.Fragment>
   )
})