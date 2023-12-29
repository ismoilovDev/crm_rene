import { FiDownload } from 'react-icons/fi'

export const ExcelButton = ({ handleOnExcel }) => {
    return (
        <button className='excel_btn' onClick={handleOnExcel}>
            Excel yuklash <FiDownload className='icon_down' />
        </button>
    )
}