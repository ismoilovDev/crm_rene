import { useState, useEffect, memo } from 'react';
import { DualAxes } from '@ant-design/plots';

export const DemoDualAxes = memo(({ orders }) => {
  const [uvBillData, setUvBillData] = useState([]);

  async function getInfo() {
    const updatedUvBillData = orders.map(item => [
      {
        time: item.date,
        value: item.accepted,
        type: 'Tasdiqlangan',
      },
      {
        time: item.date,
        value: item.denied,
        type: 'Rad etilgan',
      },
      {
        time: item.date,
        value: item.pending,
        type: 'Kutilmoqda',
      }
    ]).flat();

    setUvBillData(updatedUvBillData);
  }

  useEffect(() => {
    getInfo();
  }, [orders])

  const transformData = []
  const config = {
    data: [uvBillData, transformData],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'type',
        columnWidthRatio: 0.4,
      },
      {
        geometry: 'line',
        seriesField: 'name',
        lineStyle: ({ name }) => {
          if (name === 'a') {
            return {
              lineDash: [1, 4],
              opacity: 1,
            };
          }

          return {
            opacity: 0.5,
          };
        },
      },
    ],
    color:['green','yellow', 'red'],
  };
  return <DualAxes {...config} />;
})
