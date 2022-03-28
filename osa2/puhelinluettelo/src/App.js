
import { useState,useEffect } from 'react'
import personService from './services/persons'
import {Notification} from './components/notification'

const Filter = ({filter, setFilter}) => {
  return (
    <>
    filter shown with 
      <input onChange={(e) => setFilter(e.target.value.toLowerCase())}></input>
    </>
  )
}
const PersonForm = ({persons,setPersons,newName, newNumber,setNewName,setNewNumber,setMessage}) => {

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(p => p.name).includes(newName)){
      const replace = window.confirm(`${newName} is already on the list, replace the old number with a new one?`)
      if (replace) {
        const updated_person = {...persons.find(p => p.name === newName), number:newNumber}
        personService
          .updateNumber(updated_person)
        personService
          .getAll()
          .then(updatedPersons => setPersons(updatedPersons))
          .then(setMessage({type:'success',content:`${updated_person.name} successfully updated`}))
      }
      setTimeout(() => setMessage({type:'success',content:''}),5000)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .addNumber(personObject)
      .then(r => setPersons(persons.concat(r)))
      .then(setMessage({type:'success',content:`${personObject.name} successfully added`}))
    setNewName('')
    setNewNumber('')
    setTimeout(() => setMessage({type:'success',content:''}),5000)
  }
  return(
  <>
  <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </>
  )
}

const Persons = ({persons,setPersons,filter,setMessage}) => {

  const handleDelete = (person) => {
    const sure = window.confirm(`Are you sure?`)
    if (sure){
      personService
        .deleteNumber(person.id)
        .then(console.log(`${person.name} successfully deleted`))
        .then(setMessage({type:'success',content:`${person.name} successfully deleted`}))
        .then(personService
          .getAll()
          .then(updatedPersons => setPersons(updatedPersons)))
      setTimeout(() => setMessage({type:'success',content:''}),5000)
    }
  }

  return(
    <>
      <ul style={{listStyleType : 'none'}}>
        {persons.filter(p => p.name.toLowerCase().includes(filter)).map(person => <li key={person.name}>{person.name} {person.number}<button onClick={() => handleDelete(person)}>Delete</button></li>)}
      </ul>
    </>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter,setFilter] = useState('')
  const [message,setMessage] = useState({type:'error',content:''})
  
  useEffect(() => {
      personService
        .getAll()
        .then(initialPersons => setPersons(initialPersons))
  }
  ,[])

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <PersonForm setMessage={setMessage}persons={persons} setPersons={setPersons} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons setMessage={setMessage} setPersons={setPersons} persons={persons} filter={filter}/>
    </div>
  )

}

export default App