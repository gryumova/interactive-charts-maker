const filterData = (data) => {
    let len = data.length;
	return data.filter((el, ind) => {
        if (ind + 1 < len) {
            console.log(el, data[ind+1], el.time !== data[ind+1].time)
            return el.time !== data[ind+1].time;
        }
        else return true;
    })
}

data = [{
            value: 2123,
            time: "2022-12-12"
        },
        {
            value: 2123,
            time: "2022-12-12"
        },
        {
            value: 2123,
            time: "2022-12-12"
        },
        {
            value: 24133,
            time: "2022-12-13"
        },
        {
            value: 21312,
            time: "2022-12-14"
        },
        {
            value: 21312,
            time: "2022-12-14"
        },
        {
            value: 2121233,
            time: "2022-12-14"
        },
    ]

console.log(filterData(data));