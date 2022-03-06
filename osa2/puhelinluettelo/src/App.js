
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <ul style={{listStyleType : 'none'}}>
        {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )

}

export default App