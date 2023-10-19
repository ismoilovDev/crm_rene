import React, { useState, useEffect, memo } from 'react';
import { RingProgress } from '@ant-design/plots';


function DemoRingProgress({ procent }) {
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
}
export default memo(DemoRingProgress)