export const getItemKline = (item) => {
    return {
        open: Number(item[1]),
        high: Number(item[2]),
        low: Number(item[3]),
        close: Number(item[4]),
        time: Number(item[6])
    }
}

export const getItemPrice = (item) => {
    let data = new Date(item[6])
    data = data.toLocaleString('sv').split(' ')[0]

    return {
        value: Number(item[1]),
        time: data
    }
}

export const getDataForDraw = (value, type) => {
    if (type==="addLineSeries") return getItemPrice(value)
    else if (type==="addCandlestickSeries") return getItemKline(value)
    else return new Error("Type of charts error!")
}