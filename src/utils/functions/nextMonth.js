export const nextMonth = (inputDateStr) =>{
    const inputDate = new Date(inputDateStr);
    
    if (isNaN(inputDate.getTime())) {
        return "Invalid Date";
    }
    
    const date = new Date(inputDate);
    
    date.setMonth(date.getMonth() + 1);
    
    const currentMonthDays = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0).getDate();
    const nextMonthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    
    if (inputDate.getDate() === currentMonthDays && currentMonthDays !== nextMonthDays) {
        date.setDate(nextMonthDays);
    }
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;   
      
}