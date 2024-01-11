import React from 'react';
import "./NameLine.css";


const ChartComponent = ({place}) => {
    
	return (
        <div
            className="chart"
            id={place}
            style={{
                gridRowStart: place,
                gridRowEnd: place,
                gridColumnStart: place,
                gridColumnEnd: place
            }}
         >
        </div>
	);
};

export default ChartComponent;