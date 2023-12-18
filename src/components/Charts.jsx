import React from "react";
import "./Charts.css";
import ChartsLayout from "./ExampleChart";

const Charts = ({handle, layout}) => {

    return (
        <div id="wrapper">
            <ChartsLayout layout={layout}/>
        </div>
    )
}

export default Charts;