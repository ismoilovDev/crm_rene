import { memo } from 'react';
import { Bar } from '@ant-design/plots';

export const DemoBar = memo(({ products }) => {
  const data = products?.map(item => ({
    year: item?.name,
    value: item?.order_count,
  })) || [];

  const config = {
    data,
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: {
      position: 'top-left',
    },
  };

  return <Bar {...config} />;
})
