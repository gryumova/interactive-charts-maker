import { createChart } from 'lightweight-charts';
import { clear } from './utils';

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

function drawChart(data, params) {
    const chartOptions = {  layout: { 
                            textColor: 'black', 
                            background: { 
                                type: 'solid', 
                                color: 'white' } } }

    let place = "chart" + params.PlaceParams.x + params.PlaceParams.y
    clear(place);
    
    const chart = createChart(document.getElementById(place), chartOptions);

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
}

export { drawChart };