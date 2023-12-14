import React from "react"
import "./ControlBox.css"

function ControlBox({handle, text}) {
    return (
        <div className='controlBox'>
            <button onClick={handle} className="showValue">{text}</button>
        </div>
    )
}

export default ControlBox;