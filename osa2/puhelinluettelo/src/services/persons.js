import axios from "axios";

const url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(r => r.data)
}

const addNumber = (personObject) => {
    const request = axios.post(url, personObject)
    return request.then(r => r.data)
}


export default {
    getAll,
    addNumber
}