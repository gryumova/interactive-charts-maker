import React from "react";
import "./Charts.css";
import ChartsLayout from "./ChartsLayout";

const Charts = ({options}) => {

    return (
        <div id="wrapper">
            <ChartsLayout options={options}/>
        </div>
    )
}

export default Charts;