import { getDataForDraw, getWebsocketData} from './parseJSON';
import { filterData, getBusinessDayBeforeCurrentAt} from './utilsUpdateData';
import { getUrl, url_ } from '../http/binanceApi';
import { clear } from './utils';
import { createChart } from 'lightweight-charts';
import { LINE, CANDLE, getChartOptions } from "./constants";

export function getLineParameters(params) {
    return {
        color: params.color,
        lineStyle: params.lineStyle,
        lineWidth: params.lineWidth,
        precision: params.precision
    }
}

function getCandlestickParameters(params) {
    return {
        upColor: params.upColor,
        downColor: params.downColor,
        borderVisible: params.borderVisible,
        borderUpColor: params.borderUpColor,
        borderDownColor: params.borderDownColor,
        wickUpColor: params.wickUpColor,
        wickDownColor: params.wickDownColor
    }
}

function addNameLine(series, symbol, color, divTo) {
    let new_div = document.createElement('div');
    new_div.className = "name_place_wrapper";

    let hr = document.createElement('hr');
    hr.className = "name_place_color"
    hr.style.borderTopColor = color;
    let p = document.createElement('p');
    p.innerHTML = symbol

    new_div.appendChild(hr);
    new_div.appendChild(p); 

    function handleClick() {
        if (this.classList.contains('name_place_wrapper_passive')) {
            series.applyOptions({
                visible: true,
            });
            this.classList.remove('name_place_wrapper_passive');
        } else {
            series.applyOptions({
                visible: false,
            });
            this.classList.add('name_place_wrapper_passive');
        }
    }

    new_div.addEventListener('click', handleClick);
    divTo.appendChild(new_div);
}

export const drawChart = (params, theme) => {
    const chartOptions = getChartOptions(theme);

    let place = "chart" + params.PlaceParams.x + params.PlaceParams.y
    clear(place);
    let block = document.getElementById(place);
    
    const chart = createChart(block, chartOptions);

    chart.applyOptions({
        localization: {
            locale: "en-BD",
            timeFormatter: (time) => {
                const date = new Date(time * 1000);
                const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
                    hour: "numeric",
                    minute: "numeric",
                    month: "numeric",
                    day: "numeric",
                    year : "2-digit"
                })

                return dateFormatter.format(date);
            }
        }
    })

    chart.timeScale().applyOptions({
        barSpacing: params.BarParams.barSpacing,
        minBarSpacing: params.BarParams.minBarSpacing,
        timeVisible: true,
        tickMarkFormatter: (time, TickMarkType, locale) => {
            const date = new Date(time * 1000);
            const mydate = date.toLocaleDateString("en-BD") +
            " " +
            date.getHours() + 
            ":" +
            date.getMinutes(); 

            return mydate
        }
    });

    const candlestickSeriesMap = params.Charts.map((element) => {
        if (element.TypeParams.type === LINE) {
            return chart.addLineSeries(getLineParameters(element.ChartParams));
        } else if (element.TypeParams.type === CANDLE)
            return chart.addCandlestickSeries(getCandlestickParameters(element.ChartParams));
        else throw new Error(`Invalid graph type. It is possible to build only ${LINE} and ${CANDLE}!`);
    });

    let divTo = document.createElement('div');
    divTo.className = "name_place";

    candlestickSeriesMap.map((series, indx) => {
        loadData(params.Charts[indx], series, chart)
        addNameLine(series, 
                    params.Charts[indx].BinanceParams.symbol, 
                    params.Charts[indx].ChartParams.color, 
                    divTo
        );
    })

    block.appendChild(divTo);

    chart.timeScale().fitContent();

    const handleResize = () => {
        chart.applyOptions({ 
            width: block.clientWidth,
            height: block.clientHeight
        });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
    };
}

function updateChart(chart, candlestickSeries, params, data) {
    var timeScale = chart.timeScale();
    var XMLHttpRequest = require('xhr2');
    const xml_ = new XMLHttpRequest();

    var timer = null;
    timeScale.subscribeVisibleLogicalRangeChange(() => {
        if (timer !== null) {
            return;
        }
        timer = setTimeout(() => {
            var logicalRange = timeScale.getVisibleLogicalRange();
            if (logicalRange !== null) {
                var barsInfo = candlestickSeries.barsInLogicalRange(logicalRange);
                if (barsInfo !== null && barsInfo.barsBefore < 50) {
                    var firstTime = getBusinessDayBeforeCurrentAt(data[0].time, 1);
                    var lastTime = getBusinessDayBeforeCurrentAt(data[0].time, Math.max(150, -barsInfo.barsBefore + 150));
                    
                    let newParam = {
                        ...params.BinanceParams,
                        startTime: lastTime,
                        endTime: firstTime
                    }

                    xml_.open("GET", getUrl(url_, newParam))

                    xml_.send()

                    xml_.onload = function() {
                        let new_data = JSON.parse(xml_.response);
                        new_data = new_data.map((value) => getDataForDraw(value, params.TypeParams.type));
                        data = [...filterData(new_data), ...data];
                        
                        candlestickSeries.setData(data);
                    };
                    
                    xml_.onerror = function() { 
                        throw new Error("Connection error!");
                    };
                }
            }
            timer = null;
        }, 50);
    });
}

function addWebsocket(series, symbol, type, last) {
    last = new Date(last*1000).getMinutes();
    var socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1m`);

    socket.onopen = () => {
        console.log("socket open");
    }

    socket.onmessage = function (event) {
        let data = JSON.parse(event.data);
        let new_data = getWebsocketData(data, type);
        let new_data_m = new Date(new_data.time*1000).getMinutes();
        if (last !== new_data_m) {
            series.update(new_data, type);
            last = new_data_m;
        }
    }
}

function loadData(params, series, chart) {
    var XMLHttpRequest = require('xhr2');
    const xml_ = new XMLHttpRequest();
    xml_.open("GET", getUrl(url_, params.BinanceParams))

    xml_.send()

    xml_.onload = function() {
        let new_data = JSON.parse(xml_.response);
        new_data = new_data.map((value) => getDataForDraw(value, params.TypeParams.type));

        series.setData(new_data);
        updateChart(chart, series, params, new_data);
        addWebsocket(series, params.BinanceParams.symbol, params.TypeParams.type, new_data.slice(-1)[0].time);
    };

    xml_.onerror = function() { 
        throw new Error("Connection error!");
    };
}