import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Navigate(url) {
    let navigate = useNavigate()

    useEffect(() => {
        navigate(url, { replace: true });
    }, [url]);
}

export default Navigate