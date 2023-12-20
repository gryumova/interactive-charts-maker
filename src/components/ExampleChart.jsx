import React from "react";
import { NOK, getChartRowCount } from "../utils/utils";
import './ExampleChart.css';

function ChartsLayout({options}) {
  if (options.length === 0) return <div></div>

  const count = getChartRowCount(options);
  const nok = NOK(...Object.values(count));
  const len = Object.keys(count).length;
  const areas = generateArea(nok, len, count);

  function generateArea(nok, len, count) {
    let area = new Array(len).fill('');

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < count[i+1]; j++) {
        for (let k = 0; k < nok / count[i+1]; k++)
          area[i] += 'chart' + (i+1) + (j+1) + ' ';
      }
    }

    return area;
  }

  function generateDom() {
    return options.map((item) => {
      let place = "chart"+item.PlaceParams.x + item.PlaceParams.y;
      return <div
                className="chart"
                id={place}
                key={place}
                style={{
                  gridRowStart: place,
                  gridRowEnd: place,
                  gridColumnStart: place,
                  gridColumnEnd: place
                }}
            >
            </div>
    })
  }

  function getAreaString() {
    let s = ""
    for (let i = 0; i < len; i++) {
      s+=`"${areas[i]}" `
    }

    return s;
  }

  return (
    <div 
      className="grid-layout"
      style={{
        gridTemplateColumns: "repeat(" + nok + ", " + 100/nok + "%",
        gridTemplateRows: "repeat(" + len + ", " + 100/len + "%",
        gridTemplateAreas: `${getAreaString()}`,
        gap: 0
      }}
    >
      {generateDom()}
    </div>
  )
}

export default ChartsLayout;