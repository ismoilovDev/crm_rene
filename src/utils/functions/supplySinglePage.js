import { useNavigate } from "react-router-dom"

export function SinglePage(type, id) {
    const navigate = useNavigate();
    
    if (type === 'gold') {
       navigate(`/supplies/single-gold/${id}`, { replace: false })
    } else if (type === 'auto') {
       navigate(`/supplies/single-auto/${id}`, { replace: false })
    } else if (type === 'guarrantor') {
       navigate(`/supplies/single-owner/${id}`, { replace: false })
    } else if (type === 'insurance') {
       navigate(`/supplies/single-insurance/${id}`, { replace: false })
    }
}