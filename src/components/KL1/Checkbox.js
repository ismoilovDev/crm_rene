
const Checkbox = ({value, array, setArray, idItem}) =>{

    const elementIndex = array?.findIndex(item=>item?.id===idItem);

    function findElement(id){
        const item = array?.find(x=> x?.id ===id);
        return item;
    }

    function handleChecking(status){
        let newArray = [...array]
        newArray[elementIndex].checked = status;
        setArray(newArray)
    }

    const handleIncrement = () => {
        const newArray = [...array]
        newArray[elementIndex].count = newArray[elementIndex].count + 1;
        setArray(newArray)
    };
    
    const handleDecrement = () => {
        const newArray = [...array]
        if(newArray[elementIndex].count > 1){
            newArray[elementIndex].count = newArray[elementIndex].count - 1;
            setArray(newArray)
        }
    };

    return(
        <div className='checkbox_container'>
            <label>
                <input
                    type='checkbox' 
                    checked={findElement(idItem)?.checked}
                    onChange={(e)=>{handleChecking(e.target.checked)}}
                />
                {findElement(idItem)?.counter ? findElement(idItem)?.count : ""} {value}
            </label>
            {
                findElement(idItem)?.counter ?
                (
                    <div className='counter_buttons'>
                        <button type='button' onClick={()=>{handleIncrement()}}>+</button>
                        <button type='button' onClick={()=>{handleDecrement()}}>-</button>
                    </div>
                ) : <></>
            }
        </div>
    )
}

export default Checkbox;