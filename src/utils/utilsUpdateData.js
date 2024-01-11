const getBusinessDayBeforeCurrentAt = (date, daysDelta) => {
	const dateWithDelta = new Date(date*1000);
    dateWithDelta.setDate(dateWithDelta.getDate() - daysDelta - 1);

    return dateWithDelta.getTime();
}

const filterData = (data) => {
    let len = data.length;
	return data.filter((el, ind) => {
        if (ind + 1 < len) {
            return el.time !== data[ind+1].time;
        }
        else return true;
    })
}

const getMaxTotalSum = (data) => {
    const totalSums = data.map(order => order[0] * order[1]);
    return Math.max.apply(Math, totalSums);
}

const calcDepth = (data) => {
    let maxTotal = getMaxTotalSum(data);
    
    return data.map((order, ind) => {
        const calculatedTotal = order[0] * order[1];
        const depth = (calculatedTotal / maxTotal) * 100;
        const updatedOrder = [ ...order ];
        updatedOrder[2] = calculatedTotal;
        updatedOrder[3] = depth;
        return updatedOrder;
    })
}

const addDepth = (data) => {
    data.bids = calcDepth(data.bids);
    data.asks = calcDepth(data.asks);

    return data;
}

export {addDepth, getBusinessDayBeforeCurrentAt, filterData};