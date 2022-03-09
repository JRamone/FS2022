import axios from "axios";

const url = 'http:/localhost:3001/db'

const getAll = () => {
    const promise = axios.get(url)
    console.log(promise)
    return promise.then(r => r.data)
}


export default {
    getAll,
    addNumber
}