import React, { useEffect, useRef, useState } from 'react';
import "./OrderBookCompare.css";

const OrderBookCompare = ({ bids, asks, innerref }) => {
    const [askPercent, setAskPercent] = useState(0);
    const [bidPercent, setBidPercent] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        let width = innerref && innerref.current && innerref.current.clientWidth;

        if (width && width < 330) {
            ref.current.style.display = "none";
        }
        if (width && width > 330) {
            ref.current.style.display = "flex";
        }
    }, [asks, bids, innerref])

    useEffect(() => {
        if (asks && bids) {
            if (asks.length === 0 || bids.length === 0) {
                setAskPercent(0);
                setBidPercent(0);
                return;
            }
            let sum1 = bids.reduce((acc, cur) => acc + cur[2], 0);
            let sum2 = asks.reduce((acc, cur) => acc + cur[2], 0);
    
            setAskPercent((sum1/(sum1 + sum2) * 100).toFixed(2));
            setBidPercent((sum2/(sum1 + sum2) * 100).toFixed(2));
        } else {
            setAskPercent(0);
            setBidPercent(0);
        }
    }, [bids, asks])

    return (
        <div 
            className='orderbook_compare'
            id="orderbook_compare"
            ref={ref}
        >
            <div
                className='orderbook_compare_bids'
                style={{width: bidPercent>25? bidPercent + "%": "25%"}}
            >
                <div className='orderbook_compare_helper bids_item'>A</div>
                {bidPercent}%
            </div>
            <div
                className='orderbook_compare_asks'
                style={{width: askPercent>25? askPercent + "%": "25%"}}
            >
                {askPercent}%
                <div className='orderbook_compare_helper asks_item'>B</div>
            </div>
        </div>
    );
};

export default OrderBookCompare;