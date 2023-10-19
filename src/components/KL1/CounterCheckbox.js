const CounterCheckbox = ({value, array, setArray, idItem}) =>{

    const elementIndex = array?.findIndex(item=>item?.id===idItem);

    function findElement(id){
        const item = array?.find(x=> x?.id ===id);
        return item;
    }

    function handleChecking(status){
        const newArray = [...array]
        newArray[elementIndex].checked = status;
        setArray(newArray)
    }

    const handleChange = (value) => {
        const newArray = [...array]
        newArray[elementIndex].count = value;
        setArray(newArray)
    };

    return(
        <div className='checkbox_container'>
            <label>
                <input
                    type='checkbox' 
                    checked={findElement(idItem)?.checked}
                    onChange={(e)=>{handleChecking(e.target.checked)}}
                />
                {value}
            </label>
            <div className="count_part">
                <input 
                    id="count"
                    name="count"
                    type='number'
                    onWheel={(e) => e.target.blur()}
                    value={findElement(idItem)?.count}
                    onChange={(e)=>{handleChange(e.target.value)}}
                />
            </div>
        </div>
    )
}

export default CounterCheckbox;