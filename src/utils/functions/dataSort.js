export const dataSort = (data) =>{
    if (data === "accepted") {
        return "tasdiqlangan"
    } else if (data === "denied") {
        return "rad etilgan"
    } else if (data === 'pending') {
        return "kutilmoqda"
    } else {
        return '---'
    }
}

export const idSort = (data) =>{
    if (data === "accepted") {
       return "green"
    } else if (data === "denied") {
       return "red"
    } else if (data === "pending") {
       return "yellow"
    }
}