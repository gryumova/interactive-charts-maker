import { createChart } from 'lightweight-charts';

const defaultColorOptionCandle = { 
                                upColor: '#26a69a', 
                                downColor: '#ef5350', 
                                borderVisible: false,
                                wickUpColor: '#26a69a', 
                                wickDownColor: '#ef5350' 
                            }

function createElementById(id) {
    let parent = document.getElementById("wrapper");
    let child = document.createElement("div"); // create new div
    child.setAttribute("class", "chart")
    child.setAttribute("id", id)

    parent.appendChild(child);
}

function drawChart(data, id='first', params=defaultColorOptionCandle, type="lines") {
    const chartOptions = { layout: { 
                            textColor: 'black', 
                            background: { 
                                type: 'solid', 
                                color: 'white' 
                        } } };

    createElementById(id);
    const chart = createChart(document.getElementById(id), chartOptions);
    const candlestickSeries = type === "lines"? 
                            chart.addLineSeries(params):
                            chart.addCandlestickSeries(params);

    candlestickSeries.setData(data);

    chart.timeScale().fitContent();
}

export default drawChart;