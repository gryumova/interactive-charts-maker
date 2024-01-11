import React, { useEffect, useState } from 'react';
import "./Avg.css";

const Spread = ({ bids, asks }) => {
  const [spread, setSpread] = useState(0);

  useEffect(() => {
      if (asks && bids)
          setSpread(getAvgPrice(bids, asks).toFixed(4));
  }, [asks, bids]);

  const getAvgPrice = (bids, asks) => {
      const sumBids = bids.reduce((acc, cur) => acc + parseFloat(cur[0]), 0);
      const sumAsks = asks.reduce((acc, cur) => acc + parseFloat(cur[0]), 0);

      return (sumAsks + sumBids) / (bids.length * 2);
  }

  return (
    <div className='avg'>
        {spread} 
    </div>
  );
};

export default Spread;