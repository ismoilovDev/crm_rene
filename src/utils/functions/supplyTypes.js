export function typeFunc(type, kafillik) {
   const typeDescriptions = {
      'auto': kafillik ? 'transport vositasi garovi va kafillik' : 'transport vositasi garovi',
      'gold': 'tilla buyumlar garovi',
      'guarrantor': '3-shaxs kafilligi',
      'insurance': 'sug‘urta kompaniyasi sug‘urta polisi'
   };

   return typeDescriptions[type] || '';
}

export function typesSupply(supply, kafillik) {
   const types = supply?.map(item => {
      if (!item?.type) return;
      switch (item.type) {
         case 'auto':
            if(kafillik){
               return `transport vositasi garovi va kafillik`
            }else{
               return `transport vositasi garovi`;
            }
         case 'gold':
            return 'tilla buyumlar garovi';
         case 'guarrantor':
            return '3-shaxs kafilligi';
         case 'insurance':
            return 'sug‘urta kompaniyasi sug‘urta polisi';
         default:
            return null;
      }
   }).filter(Boolean);
   return types;
}

export function typesSupplyList(supply) {
   const typeDescriptions = {
      auto: 'transport vositasi garovi',
      gold: 'tilla buyumlar garov',
      guarantor: '3 shaxs kafilligi',
      insurance: 'sugurta',
   };

   const uniqueTypes = new Set();

   supply?.forEach((item) => {
      const type = item?.type;
      if (type && !uniqueTypes.has(type)) {
         uniqueTypes.add(type);
      }
   });

   const result = Array.from(uniqueTypes).map((type) => typeDescriptions[type]);

   if (result.length === 1) {
      return result[0];
   }

   return result;
}

export function typesSupplyGroup(clients) {
   const types = clients?.flatMap(item =>
      typesSupply(item?.order?.supply_info, true) || []
   ).filter((elem, index, self) => self.indexOf(elem) === index);
   return types;
}

export function reneConfidence(doc) {
   if (doc?.group?.clients?.[0]?.order?.product?.name === 'ReneIshonch' || doc?.product?.name === 'ReneIshonch') {
      return true
   } else {
      return false
   }
}

export function checkOwner(item) {
   return item?.possessor === 'trust_owner' ? item?.trust_owner : item?.owner ?? item?.client;
}

export function checkOwnerClient(item) {
   if (item?.possessor === 'trust_owner') {
      return item.trust_owner?.fio;
   }
   if (item?.possessor === 'owner') {
      return item.owner?.fio;
   }
   return "o'zi";
}
