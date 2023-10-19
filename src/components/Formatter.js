function Formatter(n, c) {
   const arr = x => Array.from(x);
   const num = x => Number(x) || 0;
   const isEmpty = xs => xs.length === 0;
   const take = n => xs => xs.slice(0, n);
   const drop = n => xs => xs.slice(n);
   const reverse = xs => xs.slice(0).reverse();
   const comp = f => g => x => f(g(x));
   const not = x => !x;
   const chunk = n => xs => isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];

   function numberToWords(n, c) {

      let a = [
         '', 'бир', 'икки', 'уч', 'тўрт',
         'беш', 'олти', 'етти', 'саккиз', 'тўққиз',
         'ўн', 'ўн бир', 'ўн икки', 'ўн уч', 'ўн тўрт',
         'ўн беш', 'ўн олти', 'ўн етти', 'ўн саккиз', 'ўн тўққиз'
      ];
      let b = [
         '', '', 'йигирма', 'ўттиз', 'қирқ',
         'еллик', 'олтмиш', 'етмиш', 'саксон', 'тўқсон'
      ];

      let g = [
         '', 'минг', 'миллион', 'миллард', 'триллион', 'квадриллион',
         'квитиллион', 'секстиллион', 'септиллион', 'октиллион', 'нонтиллион'
      ];

      let makeGroup = ([ones, tens, huns]) => {
         return [
            num(huns) === 0 ? '' : a[huns] + ' юз ',
            num(ones) === 0 ? b[tens] : b[tens] && b[tens] + ' ' || '',
            a[tens + ones] || a[ones]
         ].join('');
      };

      let thousand = (group, i) => group === '' ? group : `${group} ${g[i]}`;
      if (typeof n === 'number') return numberToWords(String(n));

      if (n === '0') return 'нол';

      return comp(chunk(3))(reverse)(arr(n))
         .map(makeGroup)
         .map(thousand)
         .filter(comp(not)(isEmpty))
         .reverse()
         .join(' ');
   }
}

export default Formatter