import React, { Component } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);
export default class Example extends Component {
  render() {
    var layout = [
      { i: "a", x: 0, y: 0, w: 6, h: 1 },
      { i: "b", x: 6, y: 0, w: 6, h: 1 },
      // { i: "c", x: 8, y: 0, w: 4, h: 1 },
      // { i: "d", x: 0, y: 1, w: 4, h: 1 },
      // { i: "e", x: 4, y: 1, w: 4, h: 1 },
      // { i: "f", x: 8, y: 1, w: 4, h: 1 },
    ];
    var layout1 = [
      { i: "a", x: 0, y: 0, w: 6, h: 1 },
      { i: "b", x: 6, y: 0, w: 6, h: 1 },
      { i: "c", x: 0, y: 1, w: 6, h: 1 },
      { i: "d", x: 6, y: 1, w: 6, h: 1 },
      { i: "e", x: 0, y: 2, w: 6, h: 1 },
      { i: "f", x: 6, y: 2, w: 6, h: 1 },
    ];

    var layout = { lg: layout };

    return (
      <div>
        <ResponsiveGridLayout
          className="layout"
          layouts={layout}
          breakpoints={{ lg: 1200 }}
          cols={{ lg: 12 }}
          rowHeight={250}
          width={1200}
        >
          <div key="a" style={{ backgroundColor: "yellow" }}>
            <div> a yellow </div>
          </div>
          <div key="b" style={{ backgroundColor: "green" }}>
            <div> b green </div>
          </div>
          {/* <div key="c" style={{ backgroundColor: "red" }}>
            <div> c red </div>
          </div>
          <div key="d" style={{ backgroundColor: "blue" }}>
             <div> d blue </div>
          </div>
          <div key="e" style={{ backgroundColor: "violet" }}>
            <div> e violet </div>
          </div>
         <div key="f" style={{ backgroundColor: "lemonchiffon" }}>
            <div> f lemonchiffon </div>
          </div> */}
        </ResponsiveGridLayout>
      </div>
    );
  }
}
