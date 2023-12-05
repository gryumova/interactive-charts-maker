import { getDataForDraw } from "../utils/parseJSON";
import { $host } from "./index";

const url_ = "https://api.binance.com/api/v3/klines"

function getUrl(url, params) {
    let url_ = new URL(url);
    for (let i of Object.entries(params))
        url_.searchParams.set(i[0], i[1]);

    return url_.href
}

export const getData = async (params_) => {
    let res = await $host.get('api/v3/klines', {params: params_})
    return res.data
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