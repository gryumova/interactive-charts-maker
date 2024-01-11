import React, { useEffect, useRef, useState } from 'react';
import classes from "./OrderRow.module.css";

const OrderRow = ({value, type, innerRef}) => {
    const [style, setStyle] = useState({});
    const ref = useRef(null);

    useEffect(() => {
        let width = innerRef && innerRef.current && innerRef.current.clientWidth;
        setStyle({});
        if (width < 225) {
            console.log(width);
            setStyle({
                fontSize: "9px", 
                paddingTop: "4px", 
                paddingBottom: "4px",
                paddingLeft: "0px",
                paddingRight: "0px",
            })
        } else if (width < 295) {
            setStyle({
                fontSize: "9px", 
                paddingTop: "4px", 
                paddingBottom: "4px",
                paddingLeft: "10px",
                paddingRight: "10px",
            })
        }
    }, [value])

    return (
        <div className={classes.order_row_wrapper} ref={ref}>
            <span
                className={classes.visualizer}
                ref={ref}
                style={{
                    backgroundColor: type === "asks"? "var(--depth-bids)": "var(--depth-asks)",
                    width: value[3] * 10 + "px",
                }}
            />
            <span className={classes.order_row}>
                <span 
                    className={classes.order_row_item}
                    style={{
                        textAlign: "start",
                        color: type === "asks"? "#f6475d": '#0ecb81',
                        fontSize: "11px",
                        ...style
                    }}
                    
                >{parseFloat(value[0]).toFixed(4)}</span>
                <span className={classes.order_row_item} style={style}>{parseFloat(value[1]).toFixed(4)}</span>
                <span className={classes.order_row_item} style={style}>{parseFloat(value[2]).toFixed(4)}</span>
            </span>
        </div>
    )
};

export default OrderRow;