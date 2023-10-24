import * as XLSX from 'xlsx'
import { FiDownload } from 'react-icons/fi'
import './style.scss'

export const ExcelButton = ({data, name}) =>{
    const handleOnExcel = () =>{
        var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(data)
  
        XLSX.utils.book_append_sheet(wb, ws, "jadval")
        XLSX.writeFile(wb, `${name}.xlsx`)
    }

    return(
        <button className='excel_btn' onClick={()=>{handleOnExcel()}}>Excel yuklash <FiDownload className='icon_down'/></button>
    )
}

export const ContainerExcelButton = ({data, name}) =>{
    return(
        <div className="margin_top_10 endRow">
            <ExcelButton data={data} name={name}/>
        </div>
    )
}