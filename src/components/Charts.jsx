import React from "react";
import "./Charts.css";
import ChartsLayout from "./ExampleChart";

const Charts = ({options}) => {

    return (
        <div id="wrapper">
            <ChartsLayout options={options}/>
        </div>
    )
}

export default Charts;