const parseStringSync = (str) => {
    var result;
    try {
        new require('xml2js').Parser().parseString(str, (e, r) => { result = r })
        return result;
    } catch {
        throw Error("XML parsing error")
    }
}

const getPanelParams = (panels) => {
    if (!panels) {
        throw Error("Panel not found!")
    }

    try {
        const options = panels.map(element => {
            let x = element.x[0];
            let y = element.y[0];
            if (Number(x) > 3 || Number(x) < 1 || Number(y) > 3 || Number(y) < 1) {
                throw Error("X and Y must be from 1 to 9!");
            }
            return {  
                    symbol:  element.chart[0].symbol[0],
                    color: element.chart[0].color[0],
                    place: "chart"+element.x[0]+element.y[0],
                    barSpacing: element.bar_spacing[0],
                    minBarSpacing: element.min_bar_spacing[0],
                    settings: element.chart[0].settings[0]
            }
        });
        return options;
    } catch(err) {
        throw err;
    }

}

const parsePanel = (xml) => {
    const xmlObject = parseStringSync(xml);
    if (xmlObject.layout !== null) return getPanelParams(xmlObject.layout.panel)
    else throw Error("Missing layout tag!")
}



export default parsePanel;
