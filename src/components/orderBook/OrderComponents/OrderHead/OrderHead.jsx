import React, {  } from 'react';
import classes from "./OrderHead.module.css";

const OrderHead = () => {
    return (
        <div style={{color: '#707a89'}}>
        <div className={classes.order_table_head}>
            <div className={classes.order_table_head_item} style={{textAlign:'start'}}>
                Price
            </div>
            <div 
                className={classes.order_table_head_item} 
            >
                Amount
            </div>
            <div className={classes.order_table_head_item}>
                Total
            </div>
        </div>
    </div>
    )
}

export default OrderHead;