import React, { memo } from "react";
import { ImUpload2 } from "react-icons/im"
import LoaderBackdrop from "../Loader/LoaderBackdrop";

export const FileUploader = memo(({ drag, handleUpload, handleFileSelect, uploadProgress, uploadComplete, selectedFile, disable, isDoc, handleTypeChange, handleDrop, handleDragStart, handleDragLeave }) => {

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
                  {
                     drag ?
                        <div className="drag_wrapper" onClick={handleDragLeave}>
                           <div
                              className="drag_over"
                              onDragEnter={handleDragStart}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                           >
                              Shu yerga tashlang
                           </div>
                        </div> :
                        <div
                           className="dropzone"
                           onDragEnter={handleDragStart}
                           onDragLeave={handleDragLeave}
                           onDragOver={handleDragStart}
                        >
                           <input type="file" id='file-upload' onChange={handleFileSelect} />
                           <label className="file_label" htmlFor="file-upload">
                              <div className="upload_section">
                                 <div className="uploader_icon">
                                    <ImUpload2 />
                                 </div>
                                 <p>{isDoc ? "Faylni shu yerga tashlang, yoki tanlash uchun bosing": "Fayl tanlash" }</p>
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
                        </div>
                  }
               </form>
            </div>
         </div >
         <LoaderBackdrop disable={disable} />
      </React.Fragment >
   )
})