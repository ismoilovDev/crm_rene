import { memo, useState } from "react"
import { FileUploader } from "../Uploader/FileUploader"
import https from "../../services/https"
import { Input } from "@nextui-org/react"
import { alert } from "../Alert/alert"

export const UploadDocs = memo(() => {
   const [type, setType] = useState('')
   const [disable, setDisable] = useState(false)
   const [drag, setDrag] = useState(false);
   const [selectedFile, setSelectedFile] = useState({})
   const [uploadProgress, setUploadProgress] = useState(0.01);
   const [uploadComplete, setUploadComplete] = useState(false);

   const fileChacker = (selected) => {
      if (selected && (selected.type === 'application/msword' || selected.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
         setSelectedFile(selected);
         setUploadProgress(0.01)
      } else {
         alert('Iltimos Word fayl formatida yuklang', 'error');
      }
   }

   const handleTypeChange = (event) => {
      setType(event.target.value)
   }

   const handleFileSelect = (event) => {
      const selected = event.target.files[0]
      fileChacker(selected)
   }

   const handleDragStart = async (event) => {
      event.preventDefault()
      document.body.style.overflow = 'hidden'
      setDrag(true)
   }

   const handleDragLeave = async (event) => {
      event.preventDefault()
      document.body.style.overflow = 'visible'
      setDrag(false)
   }

   const handleDrop = async (event) => {
      event.preventDefault()
      setDrag(false)
      const selected = event.dataTransfer.files[0]
      fileChacker(selected)
   }

   const handleUpload = async (event) => {
      event.preventDefault();
      if (!selectedFile) return;

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', type);
      setDisable(true)
      try {
         await https.post('/files', formData, {
            onUploadProgress: (progressEvent) => {
               const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
               setUploadProgress(progress);
            },
         });
         alert('Fayl yuklandi', 'success')
         setUploadComplete(true);
         setType('')
      } catch (error) {
         const message = error?.response?.data?.message
         alert(message, 'error')
      } finally {
         setDisable(false)
      }
   };

   return (
      <div className="upload_docs">
         <FileUploader
            drag={drag}
            isDoc={true}
            disable={disable}
            handleDrop={handleDrop}
            selectedFile={selectedFile}
            handleUpload={handleUpload}
            uploadComplete={uploadComplete}
            uploadProgress={uploadProgress}
            handleDragLeave={handleDragLeave}
            handleDragStart={handleDragStart}
            handleTypeChange={handleTypeChange}
            handleFileSelect={handleFileSelect}
         />
      </div>
   )
})