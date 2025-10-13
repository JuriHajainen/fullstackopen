// import './App.css'
import { useState } from 'react'
import Person       from './components/Person'


//--- APP ------------------------------------------------

const App = (props) => {

  const [ persons, setPersons ] = useState(props.persons)
  const [ newName, setNewName ] = useState('')
  const [ id, setId ]           = useState(2) // SET "id" to use it for new added persons
  // console.log('id:', id)
  // const [ showAll, setShowAll ] = useState(true)
  // console.log( notes.map( note => note.content ) )
  
  //--- ----------------------------------------
  const addName = (ev) => {
    ev.preventDefault()
    console.log('id from addName: before setId', id)
    setId(id + 1)
    console.log('id from addName: after setId', id)
    const personNew = {
      name: newName,
      id: id
    }
    setPersons(persons.concat(personNew))
    setNewName('') // RESET it
  }
  
  //--- ----------------------------------------
  const handleNewName = (ev) => {
    console.log(ev.target.value)
    setNewName(ev.target.value)
  }

  // const notesToShow = showAll ? notes : notes.filter( note => note.important )


  //--- ------------------------------------
  return (
    <div>

      <h2>Phonebook</h2>

      <form onSubmit={ addName }>
        <div>Name: <input type        = "text"
                          placeholder = 'A new name...'
                          value       = { newName }
                          onChange    = { handleNewName }/></div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      {/* <div>_DEV_DEBUG: { newName }</div> */}

      <h2>Numbers</h2>

      <ul>{ persons.map( person => <Person key = { person.id } person = { person } /> ) }</ul>

    </div>
  )


}

//---
export default App