import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);

export default class BasicLayout extends React.PureComponent {
    static defaultProps = {
        className: "layout",
        compactType: "horizontal",
        rowHeight: 250,
        onLayoutChange: function() {}
    };

    getCountColumns(layout) {
        if (layout.length === 0) return 0;
        const max_y = layout.reduce((acc, curr) => acc.y > curr.y ? acc : curr);
        return max_y.y + 1;
    }

    getRowsCount(layout) {
        if (layout.length === 0) return 0;

        const max_x = layout.reduce((acc, curr) => acc.x > curr.x ? acc : curr);
        return max_x.x + 1;
    }

    render() {
        return (
        <ReactGridLayout
            layout={ {lg: this.props.layout} }
            cols={this.getCountColumns(this.props.layout)}
            className="layout"
            compactType="horizontal"
            rowHeight={250}
            maxRows={this.getRowsCount(this.props.layout)}
            autoSize={true}
            onLayoutChange={function() {}}
            isDraggable={false}
            isResizable={false}
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
        </ReactGridLayout>
        );
    }
}