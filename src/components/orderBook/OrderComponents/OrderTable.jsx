import React, { forwardRef, useEffect, useRef } from 'react';
import "./OrderTable.css";
import OrderRow from './OrderRow';

const OrderTable = forwardRef(({array, type, column}, ref) => {
    
    useEffect(() => {
        if (ref !== null && type === "asks") {
            ref.current.scrollTop = 19 * 20;
        }
    }, [ref])

    return (
        <div 
            ref={ref}
            className={
                type==="asks"?"order_table_left":"order_table_right"
            }
            style={{
                height: !column? "calc(100% - 28px)": "calc(49% - 65px)"
            }}
        >
            {
                array && array.map((item, index) => {
                    return <OrderRow value={item} type={type} key={index} innerRef={ref}/>
                })
            }
        </div>
    )
})

export default OrderTable;