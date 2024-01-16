import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import $ from 'jquery';

import { fetchLoad, fetchError } from './actions/actions';
import { addDepth } from '../../utils/utilsUpdateData';
import './OrderBook.css';

import OrderHead from './OrderComponents/OrderHead/OrderHead';
import OrderTable from './OrderComponents/OrderTable/OrderTable';
import Info from './OrderComponents/Info/Info';
import Avg from './OrderComponents/Avg/Avg';
import OrderBookCompare from './OrderComponents/OrderBookCompare/OrderBookCompare';


const OrderBook = ({place, params, len}) => {
    const { isLoad, isError, Err } = useSelector((state) => state);
    const currPair = params.symbol;
    const interval = params.interval;
    let rowCount = params.depth === "true"? 20: 10;

    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);
    const [visibility, setVisibility] = useState(false);
    const [indexInfo, setIndexInfo] = useState(null);
    const [type, setType] = useState(null);
    const [column, setColumn] = useState(true);

    const asksRef = useRef(null);
    const bidsRef = useRef(null);

    useEffect(() => {
        let width = asksRef && asksRef.current && asksRef.current.clientWidth;

        if (width && width > 600) {
            setColumn(false);
        }
    })

    useEffect(() => {
        document.addEventListener("visibilitychange", () => {
            setVisibility(document.hidden);
        });

        $("#edit").change((e) => {
            setVisibility(true);
        })

        $("#preview").change(() => {
            setVisibility(false);
        })

        $(document).ready(function() {
            $(".order_table_left div").hover(function() {
                var index = $(this).index();
                setIndexInfo(index);
                setType('asks');

                $(".order_table_left div").filter(":nth-child(n+" + (index+1) + ")").addClass("hovered");
            }, function() {
                setIndexInfo(null);
                setType(null);

                $(".order_table_left div").removeClass("hovered");
            });
        });

        $(document).ready(function() {
            $(".order_table_right div").hover(function() {
                var index = $(this).index();
                setIndexInfo(index);
                setType('bids');

                $(".order_table_right div").filter(":nth-child(-n+" + (index+1) + ")").addClass("hovered");
            }, function() {
                setIndexInfo(null);
                setType(null);
                
                $(".order_table_right, div").removeClass("hovered");
            });
        });
    });

    useEffect(() => {
        setOrders([]);

        dispatch(fetchLoad(true));
        dispatch(
            fetchError({
                isError: false,
                Err: '',
            }),
        );
        const fetchLoadData = async () => {
            const url = `https://www.binance.com/api/v1/depth?symbol=${currPair}&limit=${rowCount}`;

            try {
                const res = await axios.get(url);
                setOrders(addDepth(res.data));
            } catch (error) {
                dispatch(
                fetchError({
                    isError: true,
                    Err: error.message,
                }),
                );
            } finally {
                dispatch(fetchLoad(false));
            }
        };
        fetchLoadData();
    }, [params]);

    useEffect(() => {
        if (!visibility) {

            const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${currPair.toLowerCase()}@depth${rowCount}@${interval}`);

            ws.onopen = () => {
                dispatch(
                    fetchError({
                    isError: false,
                    Err: '',
                    }),
                );
            };
            ws.onmessage = (event) => {
                const res = JSON.parse(event.data);
                setOrders(addDepth(res));
            };
            ws.onerror = (error) => {
                dispatch(
                    fetchError({
                        isError: true,
                        Err: error.message,
                    }),
                );
            };

            return () => {
                ws.close();
            };
        } 
    }, [currPair, interval, visibility]);

    const bids = orders.bids && orders.bids;
    const asks = orders.asks && orders.asks;

    return (

        <>
            {isLoad && <h2 className='loading'>Loading...</h2>}
            {isError ? (<></>) : (
                column
                ?
                <div 
                    className="chart chart_wrapper"
                    id={place}
                >
                    <div className='orderbook_title'>
                        <p style={{color: 'var(--text-color)'}}>Order Book</p>
                        <hr/><p className='orderbook_title_name'>{currPair}</p>
                    </div>
                    <OrderHead />
                    <OrderTable array={asks} type="asks" ref={asksRef} column={column}/>
                    <Avg bids={bids} asks={asks}/>
                    <OrderTable array={bids} type="bids" ref={bidsRef} column={column}/>
                    <OrderBookCompare bids={bids} asks={asks} innerref={asksRef}/>
                    <Info
                        index={indexInfo} 
                        array={type ==="asks"? asks: bids}
                        innerRef={type ==="asks"? asksRef: bidsRef}
                        type={type}
                    />
                </div>
                :
                <div 
                    className="chart"
                    id={place}
                >
                    <div className='orderbook_title'>
                        <p style={{color: 'var(--text-color)'}}>Order Book</p>
                        <hr/><p className='orderbook_title_name'>{currPair}</p>
                    </div>
                    <Avg bids={bids} asks={asks}/>
                    <div
                        style={{
                            display:"flex",
                            flexDirection:"row",
                            height: `calc(${88 - (len - 1) * 7 }% - 45px)`,
                            margin: 0,
                            padding: 0
                        }}
                    >
                        <div className='order'>
                            <OrderHead />
                            <OrderTable array={asks} type="asks" ref={asksRef} column={column}/>
                        </div>
                        <div className='order'>
                            <OrderHead />
                            <OrderTable array={bids} type="bids" ref={bidsRef} column={column}/>
                        </div>
                        <Info
                            index={indexInfo} 
                            array={type ==="asks"? asks: bids}
                            innerRef={type ==="asks"? asksRef: bidsRef}
                            type={type}
                        />
                    </div>
                    <OrderBookCompare bids={bids} asks={asks} innerref={asksRef}/>
                </div>
            )}
        </>
    )
}

export default OrderBook;