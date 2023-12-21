const getBusinessDayBeforeCurrentAt = (date, daysDelta) => {
	const dateWithDelta = new Date(Date.parse(date));
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
export {getBusinessDayBeforeCurrentAt, filterData};