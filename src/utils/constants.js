export const LINE = "addLineSeries";
export const CANDLE = "addCandlestickSeries";
export const getChartOptions = (theme) => { 
    return {
            layout: { 
            textColor: theme==='light'? '#5d6673': '#5d6673',
            background: { 
                type: 'solid', 
                color: theme==='light'? 'white': '#161b22',
            },
        },
        grid: {
            vertLines: { color: theme==='light'? '#ececec': '#272a2e' },
            horzLines: { color: theme==='light'? '#ececec': '#272a2e' },
        },
    }
};
