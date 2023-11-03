import { memo } from "react"
import '../pdf.css'

function Blank({ contract_date, client_name, sum, length }) {
    return (
        <div className={`ijro_card second_blank ${length < 8 ? 'pdf_corner' : ''} `}>
            <div className="sub_titles">
                <div className="sub_titles_item">
                    <span>
                    Mijoz: {client_name}
                    </span>
                </div>
                <div className="sub_titles_item">
                    <span>
                    Qarz miqdor: {sum} so'm
                    </span>
                </div>
                <div className="sub_titles_item">
                    <span>
                    Shartnoma sanasi: {contract_date}
                    </span>
                </div>
    
            </div>
            <div className='margin_top_10 endRow'>
                <span className='black_text'>
                    <article>
                    __________________
                    </article>
                </span>
            </div>
        </div>
    )
}
export default memo(Blank)