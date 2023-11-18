import React from "react"
import "./ControlBox.css"

function ControlBox({handle, text}) {
    return (
        <div className='controlBox'>
            <button className="showValue" onClick={handle}>{text}</button>
        </div>
    )
}

export default ControlBox;