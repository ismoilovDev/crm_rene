export function getSummaText(arr, section) {
   const total = arr?.reduce((prev, item) => prev + (item[section] || 0), 0);
   return total?.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

export function getSumma(arr, section) {
   const total = arr?.reduce((prev, item) => prev + (item[section] || 0), 0);
   return total;
}

export function supplySumProcent(clients) {
   let totalSum = 0;
   let totalPercent = 0;
   let count = 0;

   clients?.forEach((item) => {
      item?.order?.supply_info?.forEach((elem) => {
         if (elem) {
            totalSum += elem.sum || 0;
            if (elem.percent) {
               totalPercent += elem.percent;
               count++;
            }
         }
      });
   });

   totalPercent = count > 0 ? totalPercent / count : 0;

   return {
      sum: totalSum,
      percent: totalPercent,
   };
}

export function supplySumProcentClient(client) {
   let totalSum = 0;
   let totalPercent = 0;

   if (client && client.length > 0) {
      for (const elem of client) {
         if (elem) {
            totalSum += elem.sum || 0;
            totalPercent += elem.percent || 0;
         }
      }

      totalPercent /= client.length;
   }

   const total = {
      sum: totalSum,
      percent: totalPercent
   };

   return total;
}

export function collectClients(group) {
   if (!group) return '';

   const clients = group.map(item => item?.name).filter(Boolean);
   return clients.join(', ');
}

export function collectProducts(clients) {
   const uniqueProducts = new Set();

   clients?.forEach((item) => {
      const productName = item?.order?.product?.name;
      if (productName) {
         uniqueProducts.add(productName);
      }
   });

   return [...uniqueProducts].join(', ');
}

export function collectReasonsGroup(clients) {
   const uniqueReasons = new Set();

   clients?.forEach((client) => {
      client?.order?.reason?.forEach((item) => {
         if (item?.message && !uniqueReasons.has(item.message)) {
            uniqueReasons.add(item.message);
         }
      });
   });

   return Array.from(uniqueReasons);
}

export function collectGroupSupply(group) {
   const uniqueSupplies = new Set();

   group?.forEach((client) => {
      client?.order?.supply_infos?.forEach((item) => {
         console.log(item);
         if (item?.type && !uniqueSupplies.has(item.type)) {
            uniqueSupplies.add(item.type);
         }
      });
   });

   return Array.from(uniqueSupplies);
}

export function collectGroupSupplyFull(group) {
   const uniqueFullSupplies = new Set();

   group?.forEach((client) => {
      client?.order?.supply_info?.forEach((item) => {
         if (item && !uniqueFullSupplies.has(item)) {
            uniqueFullSupplies.add(item);
         }
      });
   });

   return Array.from(uniqueFullSupplies);
}

export function collectReasonsClient(client) {
   const uniqueReasons = new Set();

   client?.order?.reason?.forEach((item) => {
      if (item?.message && !uniqueReasons.has(item.message)) {
         uniqueReasons.add(item.message);
      }
   });

   return Array.from(uniqueReasons);
}

export function ordersSum(orders) {
   if (!orders) return '0.00';

   const sum = orders.map(item => item?.sum).filter(value => typeof value === 'number');
   const totalSum = sum.reduce((prev, curr) => prev + curr, 0);

   return totalSum.toLocaleString(undefined, { minimumFractionDigits: 2 });
}
