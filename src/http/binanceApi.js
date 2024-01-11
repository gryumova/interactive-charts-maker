import { getDataForDraw } from "../utils/parseJSON";

export const url_ = "https://api.binance.com/api/v3/klines"
export const websocket_url = "wss://stream.binance.com:9443/ws/"
// "<symbol>@kline_<interval>"

export const getUrl = (url, params) => {
    let url_ = new URL(url);
    for (let i of Object.entries(params))
        url_.searchParams.set(i[0], i[1]);

    return url_.href
}

export const getWebsocketUrl = (symbol) => {
    return `wss://stream.binance.com:9443/ws/${symbol}@kline_1s`
}

export const makeRequest = (params, callback) => {
    var XMLHttpRequest = require('xhr2');
    const xml_ = new XMLHttpRequest();
    xml_.open("GET", getUrl(url_, params.BinanceParams))

    xml_.send()

    xml_.onload = function() {
        let data = JSON.parse(xml_.response);
        data = data.map((value) => getDataForDraw(value, params.TypeParams.type));
        callback(data, params)
    };
    
    xml_.onerror = function() { 
        alert(`Ошибка соединения`);
    };
};

export const makeHistoryRequest = (params, period) => {
    var XMLHttpRequest = require('xhr2');
    const xml_ = new XMLHttpRequest();
    let newParam = {
        ...params.BinanceParams,
        startTime: period.timeFrom,
        endTime: period.timeTo
    }
    xml_.open("GET", getUrl(url_, newParam))

    xml_.send()

    xml_.onload = function() {
        let new_data = JSON.parse(xml_.response);
        new_data = new_data.map((value) => getDataForDraw(value, params.TypeParams.type));
        console.log(new_data);
    };
    
    xml_.onerror = function() { 
        alert(`Ошибка соединения`);
    };
}