// import './App.css'
import { useState, useEffect } from 'react'
import Filter                  from './components/Filter'
import PersonForm              from './components/PersonForm'
import Persons                 from './components/Persons'
import requests                from './services/requests'
// import axios                   from 'axios'


//--- APP ------------------------------------------------

const App = () => {


  //--- DATA: "useState" ----------------------------------------
  
  const [ persons, setPersons ]                = useState([])
  const [ newName, setNewName ]                = useState('')
  const [ newNumber, setNewNumber ]            = useState('')
  const [ search_keyword, search_keyword_set ] = useState('')
  // const [ id, setId ]                          = useState('') // SET "id" to use it for new added persons
  // const [ search_results, search_results_set ] = useState([])


  
  //--- METHODS: "useEffect" -----------------------------------
  useEffect(() => {
      // console.log('Effect')
      requests
        .getAll()
        .then(personsInitial => {
          console.log('Promise fullfulled')
          setPersons(personsInitial)
          // console.log('persons: ', persons)
        })
      }, [])
      // console.log('Render', persons.length, 'persons')
      
      
      //--- DATA: others ----------------------------------------------
    
      const re             = new RegExp(search_keyword, 'i')
      const search_results = ( persons ) ? persons.filter( person => re.test(person.name) ) : [] // (search_keyword) ? persons.filter( person => re.test(person.name) ) : []
      // const notesToShow = showAll ? notes : notes.filter( note => note.important )
      const number_validationRules_text = `Number is not valid.
      RULES:
      • 5-20 numbers
      • " ", "(", ")", "-" are allowed
      • Starts from 0-9 or "+"
      • Ends at 0-9 only
      • Any mount of " " at the start and the end will be removed by "trim"
      • Doubled "(", ")", "-" are below
      `
  
  // console.log('id:', id)
  // const [ showAll, setShowAll ] = useState(true)
  // console.log( notes.map( note => note.content ) )
  
  
  //--- METHODS ----------------------------------------

  //--- ----------------------------------------
  const addName = (ev) => {

    ev.preventDefault()

    if (newName_isEmpty(newName)) { // Is "newName" empty?
      alert('Name field is empty')
    }
    else {
        if (newNumber.trim()) { // If "newNumber" is not empty
          // console.log('newNumber_isValid(newNumber)', newNumber_isValid(newNumber))
          if (newNumber_isValid(newNumber)) { // Is phone number a valid
            submit_main()
          }
          else { // If is not
            alert(number_validationRules_text)
          }
        }
        else { // if "Number" is empty
          submit_main()
        }
    }
    
  }
  
  
  //--- ----------------------------------------
  const submit_main = () => {

    if (newName_isAlreadyAdded(newName)) { // UPDATE AN EXISTING PERSON
        submit_update()
    }
    else { // CREATE A NEW PERSON

      const personNew = {
      name:   newName.trim(),
      number: newNumber.trim(),
      id:     id_setNew()
      }

    requests
      .create(personNew)
      .then(personNew_returned => {
        setPersons(persons.concat(personNew_returned))
        newName_reset() // RESET it
        newNumber_reset() // RESET it
      })

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
    // Match everything but NOT BLANK character, at least 1 symbols
    let re = /^(\s|\S)*(\S)+(\s|\S)*$/gm
    // console.log('newName_isEmpty: ', re.test(name))
    return !re.test(name)
  }
  
  
  //--- ----------------------------------------
  const handleNewNumber = (ev) => {
    console.log(ev.target.value)
    setNewNumber(ev.target.value)
  }


  //--- ----------------------------------------
  const search_keyword_onChange = (ev) => {
    console.log(ev.target.value)
    search_keyword_set(ev.target.value)
    console.log('search_keyword', search_keyword)
    // const re = new RegExp(search_keyword, 'i')
    // search_results_set(persons.filter(person => person.name.match(re)))
    // console.log('search_results', search_results) 
  }
    
  
  //--- ----------------------------------------
  const newNumber_reset = () => {
    setNewNumber('') // RESET it
  }
  

  //--- ----------------------------------------
  const newNumber_isValid = (number) => {
    // 5-20 numbers
    // " ", "(", ")", "-" are allowed
    // Starts from 0-9 or "+"
    // Ends at 0-9 only
    // Any mount of " " at the start and the end will be removed by "trim"
    // Doubled "(", ")", "-" are below
    let re = /^(\s*[+(])?([\s-()]*?\d){5,20}(\s)*$/m;
    console.log('newNumber_isValid:', re.test(number.trim()), number)
    return re.test(number.trim())
  }
  

  //--- ----------------------------------------
  const submit_update = () => {

    let id = null
    let number_isEmpty = null
    let number_isSame = null

    persons.forEach(person => {
      if (person.name === newName.trim()) {
        id = person.id
        number_isEmpty = ( person.number ) ? false : true
        number_isSame = ( person.number === newNumber.trim() ) ? true : false
      }
    });
        
    if (number_isSame) {
      alert(`${newName.trim()} is already added to phonebook with the same number (or number was left empty)`)
    }
    else {

      let msg =
      ( number_isEmpty ) ?
      `${newName.trim()} is already added to phonebook, do you want add a number to this name?` :
      `${newName.trim()} is already added to phonebook, replace the old number with a new one?`

      if (window.confirm(msg)) {

      const personUpdate = {
        name:   newName.trim(),
        number: newNumber.trim(),
        id:     id
    }

    // setPersons(persons.concat(personNew))
    requests
      .update(id, personUpdate)
      .then(returned => {
        setPersons(prev =>
          prev.map(p => p.id === returned.id ? returned : p)
        )
        newName_reset() // RESET it
        newNumber_reset() // RESET it
      })
    } else {
      console.log('Update CANCELLED')
    }

  }

  }
  
  
  //--- ----------------------------------------
  const person_delete = (id, name) => {

    if (window.confirm(`Delete '${ name }' ?`)) {
      requests
      .remove(id)
      .then(() => {
        setPersons(prev =>
        prev.filter(person => person.id !== id)
        )
      })
      .catch(error => {
        alert(`An error occurred: '${ error }'`)
      })
      console.log('DELETED')
  } else {
    console.log('CANCELLED')
  }
  }


  //--- ----------------------------------------
  const id_setNew = () => {

    const maxId = Math.max(...persons.map(p => Number(p.id)));
    const nextId = (maxId + 1).toString();
    // setId(nextId)
    return nextId

  }


  //--- ------------------------------------
  return (
    <div>

      <h1>Phonebook</h1>

      <hr />
      
      <Filter search_keyword          = { search_keyword }
              search_keyword_onChange = { search_keyword_onChange }/>
      
      <hr />

      <PersonForm addName         = { addName }
                  newName         = { newName }
                  handleNewName   = { handleNewName }
                  newNumber       = { newNumber }
                  handleNewNumber = { handleNewNumber }/>

      {/* <div>_DEV_DEBUG: { newName }</div> */}

      <Persons search_keyword = { search_keyword }
               search_results = { search_results }
               person_delete  = { person_delete } />

    </div>
  )


}

//---
export default App