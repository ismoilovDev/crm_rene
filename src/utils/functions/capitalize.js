export const capitalize = (text) => {
   if (text) {
      const newText = text?.[0]?.toUpperCase() + text?.slice(1);
      return newText;
   }
   return '';
}