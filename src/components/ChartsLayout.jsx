import React from "react";
import { NOK, getChartRowCount } from "../utils/utils";
import './ChartsLayout.css';
import './Charts.css';
import ChartComponent from "./charts/SimpleChart";
import OrderBook from "./orderBook/OrderBook";

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
      if (Object.keys(item).includes("Charts"))
          return <ChartComponent
                    key={place}
                    place={place}
                    params={item.Charts}
                    barParams={item.BarParams}
                  />
      else return <OrderBook
                    key={place}
                    place={place}
                    params={item.OrderBook}
                    len={len}
                  />
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
    <div id="wrapper">
      <div 
        className="grid-layout"
        style={{
          gridTemplateColumns: "repeat(" + nok + ", " + 100/nok + "%",
          gridTemplateRows: "repeat(" + len + ", " + 100/len + "%",
          gridTemplateAreas: `${getAreaString()}`,
          gap: 0
        }}
      >
        {
          generateDom()
        }
      </div>
    </div>
  )
}

export default ChartsLayout;