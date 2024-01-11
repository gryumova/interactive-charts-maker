import React, { useEffect, useState } from "react";
import classes from "./Info.module.css";

const Info = ({ index, array, type, innerRef}) => {
    const [avgPrice, setAvgPrice] = useState(0);
    const [sum1, setSum1] = useState(0);
    const [sum2, setSum2] = useState(0);
    const [top, setTop] = useState(0);

    
    useEffect(() => {
        if (index === null) {
            return;
        } else if (type === 'bids') {
            setAvgPrice(array[index][0]);

            let s1 = 0;
            let s2 = 0;
            array.forEach((bid, indx) => {
                if (indx <= index) {
                    s1 += parseFloat(bid[1]);
                    s2 += bid[2];
                }
            });

            setSum1(s1);
            setSum2(s2);

            let height = innerRef && innerRef.current.clientHeight;
            let countTop = innerRef.current && Math.floor((innerRef.current.scrollTop / 19));
            
            let i = index;
            if (countTop > 0) {
                i -= countTop;
            }
            
            setTop(74 + height + i * 19);
        } else {
            setAvgPrice(array[index][0]);

            let s1 = 0;
            let s2 = 0;
            array.forEach((ask, indx) => {
                if (indx >= index) {
                    s1 += parseFloat(ask[1]);
                    s2 += ask[2];
                }
            });
            setSum1(s1);
            setSum2(s2);

            let count = innerRef && innerRef.current.clientHeight;
            count = count/19;

            let countTop = innerRef.current && Math.floor(innerRef.current.scrollTop / 19)

            let i = index - countTop;

            setTop(43 + i * 19);
        }
    }, [index, array]);

    return (
        <div>
            <div></div>
            <div 
                className={classes.order_hover_info}
                style={{
                        display: index!==null?'block':'none',
                        top: top + 'px'
                    }}
            >
                <div className={`${classes.price} ${classes.order_hover_info_item}`}>
                    <p>Avg.Price:</p>
                    <p>{avgPrice && parseFloat(avgPrice).toFixed(3)}</p>
                </div>
                <div className={`${classes.sum1} ${classes.order_hover_info_item}`}>
                    <p>Sum amount</p>
                    {sum1 && sum1.toFixed(4)}
                </div>
                <div className={`${classes.sum2} ${classes.order_hover_info_item}`}>
                    <p>Sum total</p>
                    {sum2 && sum2.toFixed(4)}
                </div>
            </div>
        </div>
    )
}

export default Info;