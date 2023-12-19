export const clear = (id) => {
    if (document.getElementById(id)) document.getElementById(id).innerHTML = '';
}                           

export const clearAll = (layout) => {   
    console.log(layout); 
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
    if (!params || params.length === 0) return [];

    let count = getChartRowCount(params);

    return params.map((panel) => {
        let x = panel.PlaceParams.x;
        let y = panel.PlaceParams.y;
        let k = Object.keys(count).length;

        return {
            i: "chart" + x + y,
            x: (y - 1) * (12 / count[x]),
            y: (x - 1) * (12 / k),
            w: 12 / count[x],
            h: 12 / k,
        }
    })
}

export const getLayoutWithBorder = (params) => {
    if (!params || params.length === 0) return [];

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