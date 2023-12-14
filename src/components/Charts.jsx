import React from "react"
import "./Charts.css"
import BasicLayout from "./BasicLayout";
import Example from "./Example";
import ChartsLayout from "./ExampleChart";

const Charts = ({layout}) => {

    return (
        <div id="wrapper">
            {/* <BasicLayout layout={layout}/> */}
            {/* <Example/> */}
            <ChartsLayout layout={layout}/>
        </div>
    )
}

export default Charts;