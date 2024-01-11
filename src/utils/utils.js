export const clear = (id) => {
    if (document.getElementById(id)) {
        // let node = document.getElementById(id);
        // while (node.children.length > 1) {
        //     node.removeChild(node.lastChild);
        // }
        document.getElementById(id).innerHTML = '';
    }
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
        let k = 12 / Object.keys(count).length;

        return {
            i: "chart" + x + y,
            x: (y - 1) * (24 / count[x]),
            y: (x - 1) * k,
            w: 24 / count[x],
            h: k,
            static: true,
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
            x: (y - 1) * (30 / count[x]),
            y: x - 1,
            w: 30 / count[x],
            h: 1,
        }
    })
}

export const NOK = (...arr) => {
    const nod = (x, y) => (!y ? x : nod(y, x % y));
    const _nok = (x, y) => (x * y) / nod(x, y);

    return [...arr].reduce((a, b) => _nok(a, b));
}