import { useState, useEffect, memo } from 'react';
import { RingProgress } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';


export const PieChart = memo(({ data }) => {
  const [circle, setCircle] = useState(70)

  useEffect(() => {
    if (window.innerWidth >= 1600) {
      setCircle(100)
    }
  }, [])

  const config = {
    appendPadding: 10,
    data,
    angleField: 'sold',
    colorField: 'gender',
    radius: 1,
    legend: false,
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        fill: '#fff',
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-single-selected',
      },
    ],
  };
  return <Pie {...config} />;
}) 

export const RingProgressBar = memo(({ procent }) => {
  const [circle, setCircle] = useState(70)

  useEffect(() => {
    if (window.innerWidth >= 1600) {
      setCircle(100)
    }
  }, [])

  const config = {
    height: circle,
    width: circle,
    autoFit: false,
    percent: procent / 1,
    color: ['#5B8FF9', '#E8EDF3'],
  };
  return <RingProgress {...config} />;
})