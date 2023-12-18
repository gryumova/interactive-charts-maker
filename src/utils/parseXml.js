const parseStringSync = (str) => {
    var result;
    try {
        new require('xml2js').Parser().parseString(str, (e, r) => { result = r })
        return result;
    } catch {
        throw Error("XML parsing error")
    }
}

const getBinanceParams = (panel) => {
    return {
        symbol: panel.chart[0].symbol[0],
        interval: '1d',
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

const getTypeParams = (panel) => {
    return {
        type: panel.chart[0].type[0],
    }
}

const getChartParams = (panel) => {
    let settings = panel.chart[0].settings[0]

    return {
        color: panel.chart[0].color[0],
        lineStyle: settings.lineStyle? Number(settings.lineStyle[0]): 0,
        visible: settings.visible? settings.visible[0]: true,
        lineWidth: settings.lineWidth? Number(settings.lineWidth[0]): 3,
        priceScaleId: settings.priceScaleId? settings.priceScaleId[0]: 'left',
        precision: settings.precision? Number(settings.precision[0]): 4
    }
}

const getPanelParams = (panels) => {
    if (!panels) {
        return null
    }

    try {
        const options = panels.map(panel => {
            return {
                PlaceParams: getPlaceParams(panel),
                BarParams: getBarParams(panel),
                TypeParams: getTypeParams(panel),
                BinanceParams: getBinanceParams(panel),
                ChartParams: getChartParams(panel)
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
