import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

const LineGraph = ({ orders }) => {
  const [ data, setData ] = useState([]);

  function destributionOrder(){
    let accepted = []
    let denied = []
    let pending = []


    orders?.map(item=>{
        accepted.push({ 
            name: 'Tasdiqlangan',
            year: item?.date,
            sum: item?.sum_accepted 
        })
        denied.push({ 
            name: 'Rad etilgan',
            year: item?.date,
            sum: item?.sum_denied  
        })
        pending.push({ 
            name: 'Kutilmoqda',
            year: item?.date,
            sum: item?.sum_pending 
        })
    })

    setData([...accepted, ...pending, ...denied].reverse())
    console.log([...accepted, ...pending, ...denied]);

  }
  useEffect(() => {
    destributionOrder()
  }, [orders]);

  const config = {
    data,
    xField: 'year',
    yField: 'sum',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: (v) => `${(v / 1000000).toFixed(1)} M`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: false,
    
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
    color:['red', 'orange', 'green'],
  };

  return <Line {...config} />;
};

export default LineGraph