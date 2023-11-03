import { AiOutlinePrinter } from 'react-icons/ai'

export const PrintButton = () =>(
    <button onClick={() => window.print()}>
        Print
        <AiOutlinePrinter />
    </button>
)