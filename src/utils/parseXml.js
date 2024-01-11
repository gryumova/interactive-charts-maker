const parseStringSync = (str) => {
    var result;
    try {
        new require('xml2js').Parser().parseString(str, (e, r) => { result = r })
        return result;
    } catch {
        throw Error("XML parsing error")
    }
}

const getBinanceParams = (chart) => {
    return {
        symbol: chart.symbol[0],
        interval: '1m',
        limit: 1500
    }
}

const getPlaceParams = (panel) => {
    return {
        x: Number(panel.x[0]),
        y: Number(panel.y[0])
    }
}

const getBarParams = (panel) => {
    return {
        barSpacing: Number(panel.bar_spacing[0]),
        minBarSpacing: Number(panel.min_bar_spacing[0]),
    }
}

const getTypeParams = (chart) => {
    return {
        type: chart.type[0],
    }
}

const getSettingsLine = (chart) => {
    let settings = chart.settings[0];

    let parse = require('parse-color');
    if (!parse(chart.color[0]).rgb) {
        throw new Error("Check line color!")
    }
    else return {
        color: chart.color[0],
        lineStyle: settings.lineStyle? Number(settings.lineStyle[0]): 0,
        visible: settings.visible? settings.visible[0]: true,
        lineWidth: settings.lineWidth? Number(settings.lineWidth[0]): 3,
        priceScaleId: settings.priceScaleId? settings.priceScaleId[0]: 'left',
        precision: settings.precision? Number(settings.precision[0]): 4
    }
}

const getSettingsCandlestick = (chart) => {
    let settings = chart.settings[0];

    let parse = require('parse-color');
    if (!parse(chart.color[0]).rgb || 
        !parse(settings.upColor[0]).rgb ||
        !parse(settings.downColor[0]).rgb ||
        !parse(settings.borderUpColor[0]).rgb ||
        !parse(settings.borderDownColor[0]).rgb ||
        !parse(settings.wickUpColor[0]).rgb ||
        !parse(settings.wickDownColor[0]).rgb) {
        throw new Error("Check color settings on candle chart!")
    }
    return {
        priceScaleId: settings.priceScaleId? settings.priceScaleId[0]: 'left',
        visible: settings.visible? settings.visible[0]: true,
        color: chart.color[0],
        upColor: settings.upColor? settings.upColor[0]: '#26a69a',
        downColor: settings.downColor? settings.downColor[0]: '#ef5350',
        borderVisible: settings.borderVisible? settings.borderVisible[0]: true,
        borderUpColor: settings.borderUpColor? settings.borderUpColor[0]: '#26a69a',
        borderDownColor: settings.borderDownColor? settings.borderDownColor[0]: '#ef5350',
        wickUpColor: settings.wickUpColor? settings.wickUpColor[0]: '#26a69a',
        wickDownColor: settings.wickDownColor? settings.wickDownColor[0]: '#ef5350'
    }
}

const getCharts = (charts) => {
    return charts.map((chart) => { 
        return {
            TypeParams: getTypeParams(chart),
            BinanceParams: getBinanceParams(chart),
            ChartParams: chart.type[0] === "addLineSeries" ? 
                        getSettingsLine(chart): 
                        chart.type[0] === "addCandlestickSeries" ? 
                        getSettingsCandlestick(chart):
                        {}
        }
    })
}

const getOrderBook = (order) => {
    return {
        symbol: order.symbol? order.symbol[0]: "BTCUSDT",
        interval: order.interval? order.interval[0]: 1000,
        depth: order.maxdepth? order.maxdepth[0]: false
    }
}

const IsChart = (panel) => {
    return Object.keys(panel).includes("chart");
}

const getPanelParams = (panels) => {
    if (!panels) {
        return null
    }

    try {
        const options = panels.map(panel => {
            if (IsChart(panel))
                return {
                    PlaceParams: getPlaceParams(panel),
                    BarParams: getBarParams(panel),
                    Charts: getCharts(panel.chart),
                }
            else return {
                PlaceParams: getPlaceParams(panel),
                OrderBook: getOrderBook(panel.orderBook[0]),
            }
        })

        return options;
    } catch(err) {
        throw Error(err.message)
    }
}

const parsePanel = (xml) => {
    const xmlObject = parseStringSync(xml);
    if (!xmlObject) throw new Error("Missing layout tag!");

    if (xmlObject.layout !== null) return getPanelParams(xmlObject.layout.panel)
    else throw new Error("Missing layout tag!")
}

export {
    parsePanel
}
