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

    if (newName_isEmpty(newName)) { // Is empty?
      alert('Name field is empty')
      newName_reset() // RESET it
    }
    else {
      if (newName_isAlreadyAdded(newName)) {
        alert(`${newName.trim()} is already added to phonebook`)
      }
      else {
        // console.log('id from addName: before setId', id)
        setId(id + 1)
        // console.log('id from addName: after setId', id)
        const personNew = {
          name: newName.trim(),
          id: id
        }    
        setPersons(persons.concat(personNew))
        newName_reset() // RESET it
      }
    }

  }


  //--- ----------------------------------------
  const handleNewName = (ev) => {
    // console.log(ev.target.value)
    setNewName(ev.target.value)
  }


  //--- ----------------------------------------
  const newName_reset = () => {
    setNewName('') // RESET it
  }


  //--- ----------------------------------------
  const newName_isAlreadyAdded = (name) => {
    let isAlreadyAdded = false
    persons.forEach(person => {
      if (person.name === name.trim()) isAlreadyAdded = true
    });
    return isAlreadyAdded
  }

  //--- ----------------------------------------
  const newName_isEmpty = (name) => {
    let re = /^(\s|\S)*(\S)+(\s|\S)*$/gm // Match everything but NOT BLANK character, at least 1 symbols
    // console.log('newName_isEmpty: ', re.test(name))
    return !re.test(name)
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