import axios from "axios";

const url = 'http://localhost:3001/db'
let id_counter;

const getAll = () => {
    const initial_persons = axios.get(url).then(r => r.data.persons)
    console.log(initial_persons);
    return initial_persons
}

const addNumber = (name, number) => {
    const newPerson = {
        name,
        number,
        id : id_counter
    }
    id_counter +=1
    const promise = axios.post(url, newPerson)
}


export default {
    getAll,
    addNumber
}