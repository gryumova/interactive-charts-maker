import { LINE, CANDLE } from "./constants";

export const getItemKline = (item) => {
    return {
        open: Number(item[1]),
        high: Number(item[2]),
        low: Number(item[3]),
        close: Number(item[4]),
        time: Number(item[6]) / 1000
    }
}

export const getItemPrice = (item) => {
    return {
        value: Number(item[1]),
        time: Number(item[6]) / 1000
    }
}

const websocketCandle = (item) => {
    return {
        open: Number(item.k.o),
        high: Number(item.k.h),
        low: Number(item.k.l),
        close: Number(item.k.c),
        time: Number(item.k.t) / 1000
    }
}

const websocketLine = (item) => {
    return {
        value: Number(item.k.o),
        time: Number(item.k.t) / 1000
    }
}

export const getDataForDraw = (value, type) => {
    if (type === LINE) return getItemPrice(value)
    else if (type === CANDLE) return getItemKline(value)
    else return new Error("Type of charts error!")
}

export const getWebsocketData = (value, type) => {
    if (type === LINE) return websocketLine(value)
    else if (type === CANDLE) return websocketCandle(value)
    else return new Error("Type of charts error!")
}