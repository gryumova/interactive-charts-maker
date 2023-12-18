export const clear = (id) => {
    if (document.getElementById(id)) document.getElementById(id).innerHTML = '';
}                           

export const clearAll = (layout) => {    
    layout.forEach((item) => {
        document.getElementById(item.i).innerHTML = '';
    })
}

export const getChartRowCount = (params) => {
    let count = {}
    params.forEach((element) => {
        if (count[element.PlaceParams.x])
            count[element.PlaceParams.x] += 1;
        else count[element.PlaceParams.x] = 1;
    })

    return count;
}

export const getLayout = (params) => {
    if (params.length === 0) return [];

    let max_y = params.reduce((acc, curr) => acc.PlaceParams.y > curr.PlaceParams.y ? acc : curr);
    max_y = max_y.PlaceParams.y;

    let count = getChartRowCount(params);

    return params.map((panel) => {
        let x = panel.PlaceParams.x;
        let y = panel.PlaceParams.y;

        return {
            i: "chart" + x + y,
            x: x - 1,
            y: y - 1,
            w: max_y / count[x],
            h: 1,
        }
    })
}

export const getLayoutWithBorder = (params) => {
    if (params.length === 0) return [];

    let count = getChartRowCount(params);

    return params.map((panel) => {
        let x = panel.PlaceParams.x;
        let y = panel.PlaceParams.y;

        return {
            i: "chart" + x + y,
            x: (y - 1) * (12 / count[x]),
            y: x - 1,
            w: 12 / count[x],
            h: 1,
        }
    })
}