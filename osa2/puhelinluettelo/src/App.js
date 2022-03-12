
import { useState,useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/notification'

const Filter = ({filter, setFilter}) => {
  return (
    <>
    filter shown with 
      <input onChange={(e) => setFilter(e.target.value.toLowerCase())}></input>
    </>
  )
}
const PersonForm = ({persons,setPersons,newName, newNumber,setNewName,setNewNumber}) => {

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
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .addNumber(personObject)
      .then(r => setPersons(persons.concat(r)))
    setNewName('')
    setNewNumber('')
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

const Persons = ({persons,setPersons,filter}) => {

  const handleDelete = (e) => {
    console.log(e.target.value)
    const sure = window.confirm(`Are you sure?`)
    if (sure){
      personService
        .deleteNumber(e.target.value)
        .then(console.log(`id ${e.target.value} successfully deleted`))
      personService
        .getAll()
        .then(updatedPersons => setPersons(updatedPersons))
    }
    
  
  }

  return(
    <>
      <ul style={{listStyleType : 'none'}}>
        {persons.filter(p => p.name.toLowerCase().includes(filter)).map(person => <li key={person.name}>{person.name} {person.number}<button value={person.id} onClick={handleDelete}>Delete</button></li>)}
      </ul>
    </>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter,setFilter] = useState('')
  const [message,setMessage] = useState({})

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
      <Notification message={message} setMessage={setMessage}/>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons setPersons={setPersons} persons={persons} filter={filter}/>
    </div>
  )

}

export default App