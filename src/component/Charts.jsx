import React from "react"
import ControlBox from "./ControlBox";
import "./Charts.css"

function Charts({handleShow}) {
    return (
        <div id="wrapper">
            <ControlBox handle={handleShow} text="Show"/>
            <div className="chart" id="chart11"></div>
            <div className="chart" id="chart12"></div>
            <div className="chart" id="chart13"></div>
            <div className="chart" id="chart21"></div>
            <div className="chart" id="chart22"></div>
            <div className="chart" id="chart23"></div>
            <div className="chart" id="chart31"></div>
            <div className="chart" id="chart32"></div>
            <div className="chart" id="chart33"></div>
        </div>
    )
}

export default Charts;