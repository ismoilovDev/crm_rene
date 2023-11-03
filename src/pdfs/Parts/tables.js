function getSummaText(arr, section){
    let array = []
    arr?.map((item) => {
        array.push(item[section])
    })
    let total = array.reduce((prev, current) => prev + current, 0)
    return total?.toLocaleString(undefined, {minimumFractionDigits: 2})
} 

export const AutoTable = ({auto}) =>(
    <div className='margin_top_20'>
        <table className='single_table_pdf'>
            <tbody>
                <tr key={99}>
                    <td>№</td>
                    <td>Nomi</td>
                    <td>Ishlab chiqarilgan yil</td>
                    <td>Davlat raqam belgisi</td>
                    <td>Transport vositasi turi</td>
                    <td>Qayd etish guvohnomasi</td>
                    <td>Dvigatel raqami</td>
                    <td>Kuzov raqami</td>
                    <td>Shassi №</td>
                    <td>Baholangan qiymati, so'm</td>
                </tr>
                {
                    auto?.map((car,carIndex)=>{
                        return(
                        <tr key={car?.id}>
                            <td>{carIndex + 1}</td>
                            <td>{car?.name}</td>
                            <td>{car?.year}</td>
                            <td>{car?.number}</td>
                            <td>{car?.type_of_auto}</td>
                            <td>{car?.registration_cert}</td>
                            <td>{car?.engine_number}</td>
                            <td>{car?.body_code}</td>
                            <td>{car?.chassis}</td>
                            <td>{car?.sum?.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <div className='endRow margin_top_10'>
            <p className='black_text'>JAMI: {getSummaText(auto, 'sum')} so`m</p>
        </div>
    </div>
)

export const GoldTable = ({gold}) =>(
    <div className='p1_second_table pdf_margin_top_20'>
        <div className='p1_second_table_headers' key={15}>
            <p className='p1_second_headers_product'>№</p>
            <p className='p1_second_headers_product'>Nomi</p>
            <p className='p1_second_headers_product'>Proba</p>
            <p className='p1_second_headers_product'>O'lchov birligi</p>
            <p className='p1_second_headers_product'>Soni</p>
            <p className='p1_second_headers_product'>Umumiy og'irligi (gr)</p>
            <p className='p1_second_headers_product'>Toshlari og'irligi (gr)</p>
            <p className='p1_second_headers_product'>Sof og'irligi (gr)</p>
            <p className='p1_second_headers_product'>Baholangan qiymati, so`m</p>
        </div>
        {
            gold?.map((gold, goldIndex)=>{
                return(
                    <div className='p1_second_table_headers' key={gold?.id}>
                        <p className='p1_second_headers_product'>{goldIndex +1}</p>
                        <p className='p1_second_headers_product'>{gold?.name}</p>
                        <p className='p1_second_headers_product'>{gold?.gold_num}</p>
                        <p className='p1_second_headers_product'>{gold?.measure}</p>
                        <p className='p1_second_headers_product'>{gold?.quantity}</p>
                        <p className='p1_second_headers_product'>{gold?.weight?.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                        <p className='p1_second_headers_product'>{gold?.stone_weight?.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                        <p className='p1_second_headers_product'>{gold?.clean_weight?.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                        <p className='p1_second_headers_product'>{gold?.sum?.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                    </div>
                )
            })
        }
        <div className='p1_second_table_headers' key={13}>
            <p className='p1_second_headers_product'></p>
            <p className='p1_second_headers_product black_text'>Jami</p>
            <p className='p1_second_headers_product'></p>
            <p className='p1_second_headers_product'></p>
            <p className='p1_second_headers_product'></p>
            <p className='p1_second_headers_product black_text'>{getSummaText(gold, 'weight')}</p>
            <p className='p1_second_headers_product black_text'>{getSummaText(gold, 'stone_weight')}</p>
            <p className='p1_second_headers_product black_text'>{getSummaText(gold, 'clean_weight')}</p>
            <p className='p1_second_headers_product black_text'>{getSummaText(gold, 'sum')}</p>
        </div>
    </div>
)