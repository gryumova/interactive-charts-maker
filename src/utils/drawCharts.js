import { createChart } from 'lightweight-charts';

const defaultColorOptionCandle = { 
                                upColor: '#26a69a', 
                                downColor: '#ef5350', 
                                borderVisible: false,
                                wickUpColor: '#26a69a', 
                                wickDownColor: '#ef5350' 
                            }

function clear(id) {
    document.getElementById(id).innerHTML = '';
}

function getLineParameters(params) {
    return {
        color: params.color,
        lineStyle: params.lineStyle,
        lineWidth: params.lineWidth
    }
}

function drawChart(data, params=defaultColorOptionCandle, id='chart11', type="lines") {
    const chartOptions = {  layout: { 
                            textColor: 'black', 
                            background: { 
                                type: 'solid', 
                                color: 'white' } } };
    
    clear(id);
    const chart = createChart(document.getElementById(id), chartOptions);

    chart.timeScale().applyOptions({
        barSpacing: params.barSpacing? params.barSpacing: 6,
    });

    const candlestickSeries = type === "lines"? 
                            chart.addLineSeries(getLineParameters(params)):
                            chart.addCandlestickSeries(params);

    chart.timeScale().applyOptions({
        minBarSpacing: params.minBarSpacing? params.minBarSpacing: 0.5,
    });

    candlestickSeries.setData(data);

    chart.timeScale().fitContent();
}

export default drawChart;