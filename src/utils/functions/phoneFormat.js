export const phoneFormat = (phone) => {
    let newNumber = phone;

    if(phone?.length===13){
        newNumber = `${phone?.slice(0, 4)} ${phone?.slice(4, 6)} ${phone?.slice(6, 9)}-${phone?.slice(9, 11)}-${phone?.slice(11,)}`
    }
    // else if(phone?.length===12){
    //     newNumber = `+${phone?.slice(0, 3)} ${phone?.slice(3, 5)} ${phone?.slice(5, 8)}-${phone?.slice(8, 10)}-${phone?.slice(10,)}`
    // }
    else if(phone?.length===9){
        newNumber = `+998 ${phone?.slice(0, 2)} ${phone?.slice(2, 5)}-${phone?.slice(5, 7)}-${phone?.slice(7,)}`
    }

    return newNumber;
}