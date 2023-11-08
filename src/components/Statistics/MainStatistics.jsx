import { memo, useState } from 'react';
import { ImUpload2 } from "react-icons/im";
import { IoBagSharp } from "react-icons/io5";
import { MdAccountBalance } from "react-icons/md";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { alert } from './../Alert/alert';
import { StatisticsBox } from './StatisticsBox';
import LoaderBackdrop from '../Loader/LoaderBackdrop';
import https from '../../services/https';

const role = JSON.parse(window.localStorage.getItem('role'));

export const MainStatistics = memo(({ overData }) => {
   const [selectedFile, setSelectedFile] = useState({})
   const [uploadProgress, setUploadProgress] = useState(1);
   const [uploadComplete, setUploadComplete] = useState(false);
   const [disable, setDisable] = useState(false)

   const handleFileSelect = (event) => {
      const selected = event.target.files[0]
      if (selected && (selected.type === 'application/vnd.ms-excel' || selected.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
         setSelectedFile(selected);
      } else {
         alert('Iltimos excel fayl formatida yuklang', 'error');
      }
   };

   const handleUpload = async (e) => {
      e.preventDefault();
      if (!selectedFile) return;

      const formData = new FormData();
      formData.append('file', selectedFile);
      setDisable(true)
      try {
         await https.post('/statistics', formData, {
            onUploadProgress: (progressEvent) => {
               const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
               setUploadProgress(progress);
            },
         });
         alert('Fayl yuklandi', 'success')
         setUploadComplete(true);
      } catch (error) {
         alert('Fayl yuklanmadi', 'error')
         console.error('Upload error:', error);
      } finally {
         setDisable(false)
      }
   };

   return (
      <div className="statistics">
         <h2>Filial ko'rsatkichlari</h2>
         <div className="statistics_header">
            <span>{overData?.text}.</span>
         </div>
         <div className="main-statistics">
            <div className='statistics_box'>
               <StatisticsBox
                  sum={overData?.portfel?.suma.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  count={overData?.portfel?.count.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  percent={overData?.portfel?.percent}
                  percentage_title={'Foizi'}
                  title={'Portfel'}
                  Icon={IoBagSharp}
                  is_pros={false}
               />
               <StatisticsBox
                  sum={overData?.overdue?.portfel_overdue.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  count={overData?.overdue?.count_overdue.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  percent={overData?.overdue?.percentage_portfolio}
                  percentage_title={'Portfelga nisbatan foizi'}
                  title={'Muddati o\'tgan qarzdorliklar'}
                  Icon={BsCalendar2WeekFill}
                  is_pros={true}
               />
               <StatisticsBox
                  sum={overData?.par30sud?.amount_loans.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  count={overData?.par30sud?.count_credits.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  percentage_title={'PAR30+Sud jarayonidagi kreditlarning portfelga nisbatan foizi'}
                  percent={overData?.par30sud?.percentage_loans_to_portfolio}
                  Icon={MdAccountBalance}
                  title={'PAR30'}
                  is_pros={false}
               />
            </div>
            {
               role?.includes('admin') ?
                  <div className='file_uploader'>
                     <div className="uploader_box">
                        <form onSubmit={handleUpload}>
                           <input type="file" required id='file-upload' onChange={handleFileSelect} />
                           <label htmlFor="file-upload">
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
                  </div> : null
            }
            <LoaderBackdrop disable={disable} />
         </div>
      </div>
   )
})
