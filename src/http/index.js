import axios from "axios"

const $host = axios.create({
    baseURL: "https://api.binance.com/",
})


export {
    $host,
}
