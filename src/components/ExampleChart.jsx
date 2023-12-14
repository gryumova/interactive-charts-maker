import React, { Component } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);
export default class ChartsLayout extends Component {
  render() {
    var layout = { lg: this.props.layout };
    
    console.log(layout);
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
            {
                this.props.layout.map((item) => {
                    return <div 
                                key={item.i}
                                id={item.i}
                                className="chart"
                            >
                            </div>
                })
            }
        </ResponsiveGridLayout>
      </div>
    );
  }
}
