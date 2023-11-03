export default function fullName(name) {
   let nameArr = name?.split(' ')
   function DoubleLetter(name) {
      if (name?.slice(0, 2) === 'Sh' || name?.slice(0, 2) === 'Ch' || name?.slice(0, 2) === 'ch' || name?.slice(0, 2) === 'sh') {
         return (name?.slice(0, 2))
      } else {
         return (name?.slice(0, 1))
      }
   }

   if(nameArr?.[0] === 'vvb'){
      return `${nameArr?.[0]} ${nameArr?.[1]} ${DoubleLetter(nameArr?.[2])}.${DoubleLetter(nameArr?.[3])}.`
   }else if (nameArr?.length == 2) {
      return `${nameArr?.[0]} ${DoubleLetter(nameArr?.[1])}.`
   } else if (nameArr?.length >= 3) {
      return `${nameArr?.[0]} ${DoubleLetter(nameArr?.[1])}.${DoubleLetter(nameArr?.[2])}.`
   } else {
      return name
   }
}
