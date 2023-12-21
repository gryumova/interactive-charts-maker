import { createChart } from 'lightweight-charts';
import { clear } from './utils';
import { getBusinessDayBeforeCurrentAt, filterData } from './utilsUpdateData';
import { getUrl, makeHistoryRequest, url_ } from '../http/binanceApi';
import { getDataForDraw } from './parseJSON';

const defaultColorOptionCandle = { 
                                upColor: '#26a69a', 
                                downColor: '#ef5350', 
                                borderVisible: false,
                                wickUpColor: '#26a69a', 
                                wickDownColor: '#ef5350' 
                            }

function getLineParameters(params) {
    return {
        color: params.color,
        lineStyle: params.lineStyle,
        lineWidth: params.lineWidth,
        precision: params.precision
    }
}

function addNameplace(place, block) {
    let namePlace = document.createElement('div');
    namePlace.className = "name_place";
    namePlace.innerHTML = "x = " + place.x + "<br> y = " + place.y;
    block.appendChild(namePlace);
}


function getChart(data, params) {
    const chartOptions = {  layout: { 
        textColor: 'black', 
        background: { 
            type: 'solid', 
            color: 'white' } } }

    let place = "chart" + params.PlaceParams.x + params.PlaceParams.y
    clear(place);
    let block = document.getElementById(place);
    
    const chart = createChart(block, chartOptions);

    chart.timeScale().applyOptions({
        barSpacing: params.BarParams.barSpacing,
        minBarSpacing: params.BarParams.minBarSpacing,
        visible: params.ChartParams.visible
    });

    const candlestickSeries = params.TypeParams.type === "addLineSeries"? 
                            chart.addLineSeries(getLineParameters(params.ChartParams)):
                            chart.addCandlestickSeries(defaultColorOptionCandle);

    candlestickSeries.setData(data);

    chart.timeScale().fitContent();

    window.addEventListener("resize", () => {
        chart.applyOptions({
            width: block.clientWidth,
            height: block.clientHeight
        });
    });

    addNameplace(params.PlaceParams, block);

    return [chart, candlestickSeries]
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
                if (barsInfo !== null && barsInfo.barsBefore < 250) {
                    var firstTime = getBusinessDayBeforeCurrentAt(data[0].time, 1);
                    var lastTime = getBusinessDayBeforeCurrentAt(data[0].time, Math.max(500, -barsInfo.barsBefore + 500));
                    
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
                        alert(`Ошибка соединения`);
                    };
                }
            }
            timer = null;
        }, 50);
    });
}


function drawChart(data, params) {
    let [chart, candlestickSeries] = getChart(data, params);
    updateChart(chart, candlestickSeries, params, data);
}

export { drawChart };