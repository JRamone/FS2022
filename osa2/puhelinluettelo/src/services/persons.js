import axios from "axios";

// Palvelimen toiminnallisuudesta vastaava moduuli.
const url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(r => r.data)
}

const addNumber = (personObject) => {
    const request = axios.post(url, personObject)
    return request.then(r => r.data)
}

const deleteNumber = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then(r => r.data)
}


export default {
    deleteNumber,
    getAll,
    addNumber
}