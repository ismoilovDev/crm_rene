import fullName from './fullName'

function dateConvert(name){
    if(name?.length > 30){
        return fullName(name);
    }
    return name;
}

export default dateConvert;