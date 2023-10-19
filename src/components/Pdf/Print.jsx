import { memo } from 'react'
import { AiOutlinePrinter } from 'react-icons/ai'

export const PrintButton = memo(() => (
    <button onClick={() => window.print()}>
        Print
        <AiOutlinePrinter />
    </button>
))