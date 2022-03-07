
import { useState,useEffect } from 'react'
import axios from 'axios'

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
      window.alert(`${newName} is already on the list!`)
      return
    }
    setPersons(persons.concat({name : newName, number : newNumber}))
    setNewName('')
    setNewNumber('')
    console.log('hello');
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
const Persons = ({persons,filter}) => {
  return(
    <>
      <ul style={{listStyleType : 'none'}}>
        {persons.filter(p => p.name.toLowerCase().includes(filter)).map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </>
  )
}

const App = () => {

  useEffect(() => {
    const handler = (response) => {
      setPersons(response.data.persons)
    }

    axios.get('http://localhost:3001/db')
      .then(handler)
    
    
  }, [])
  

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter,setFilter] = useState('')

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )

}

export default App