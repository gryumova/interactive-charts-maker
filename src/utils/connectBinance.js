const defaultColor = "#2962FF"

function getUrl(url, params) {
    let url_ = new URL(url);
    for (let i of Object.entries(params))
        url_.searchParams.set(i[0], i[1]);

    return url_.href
}

function getItemKline(item) {
    return {
        open: Number(item[1]),
        high: Number(item[2]),
        low: Number(item[3]),
        close: Number(item[4]),
        time: Number(item[6])
    }
}

function getDrawParams(params) {
    return {
        color: params.color? params.color: defaultColor,
        lineStyle: params.settings.lineStyle? params.settings.lineStyle[0]: 0,
        lineWidth: params.settings.lineWidth? params.settings.lineWidth[0]: 3,
        priceScaleId: params.settings.priceScaleId? params.settings.priceScaleId[0]: 'left'
    }
}

function getItemPrice(item) {
    return {
        value: Number(item[1]),
        time: Number(item[6])
    }
}

function getParamsKlines(params) {
    return {
        symbol: params.symbol,
        interval: '1h',
        limit: 1500
    }
}

const URLCandels = "https://api.binance.com/api/v3/klines";

const makeRequest = (params, callback, url_=URLCandels, method_="GET") => {
    var XMLHttpRequest = require('xhr2');
    const xml_ = new XMLHttpRequest();
    xml_.open(method_, getUrl(url_, getParamsKlines(params)))

    xml_.send()

    console.log("Draw Parameters", getDrawParams(params))
    xml_.onload = function() {
        const data = JSON.parse(xml_.response).map((value) => getItemPrice(value));
        callback(data, "first", getDrawParams(params));
    };
    
    xml_.onerror = function() { 
        alert(`Ошибка соединения`);
    };
};

export default makeRequest