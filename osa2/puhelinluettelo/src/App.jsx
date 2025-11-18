// import './App.css'
import { useState, useEffect } from 'react'
import Filter                  from './components/Filter'
import PersonForm              from './components/PersonForm'
import Persons                 from './components/Persons'
import axios                   from 'axios'


//--- APP ------------------------------------------------

const App = () => {


  //--- DATA ----------------------------------------
  
  const [ persons, setPersons ]                = useState([])
  const [ newName, setNewName ]                = useState('')
  const [ newNumber, setNewNumber ]            = useState('')
  const [ id, setId ]                          = useState(7) // SET "id" to use it for new added persons
  const [ search_keyword, search_keyword_set ] = useState('')
  // const [ search_results, search_results_set ] = useState([])
 
  useEffect(() => {
      console.log('Effect')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('Promise fullfulled')
          setPersons(response.data)
        })
    }, [])
  console.log('Render', persons.length, 'persons')

  const re             = new RegExp(search_keyword, 'i')
  const search_results = persons.filter( person => re.test(person.name) ) // (search_keyword) ? persons.filter( person => re.test(person.name) ) : []
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
      if (newName_isAlreadyAdded(newName)) { // Is "newName" already added?
        alert(`${newName.trim()} is already added to phonebook`)
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
    
  }
  
  
  //--- ----------------------------------------
  const submit_main = () => {

    // console.log('id from addName: before setId', id)
     setId(id + 1)
    // console.log('id from addName: after setId', id)

    const personNew = {
     name:   newName.trim(),
     number: ( newNumber.trim() ) ? newNumber.trim() : '-- no number --',
     id:     id
    }

    setPersons(persons.concat(personNew))
    newName_reset() // RESET it
    newNumber_reset() // RESET it

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
               search_results = { search_results }/>

    </div>
  )


}

//---
export default App