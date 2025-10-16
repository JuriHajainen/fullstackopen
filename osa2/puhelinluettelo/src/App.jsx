// import './App.css'
import { useState } from 'react'
import Person       from './components/Person'


//--- APP ------------------------------------------------

const App = (props) => {


  const [ persons, setPersons ]                = useState(props.persons)
  const [ newName, setNewName ]                = useState('')
  const [ newNumber, setNewNumber ]            = useState('')
  const [ id, setId ]                          = useState(7) // SET "id" to use it for new added persons
  const [ search_keyword, search_keyword_set ] = useState('')
  // const [ search_results, search_results_set ] = useState([])

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
  
  const re             = new RegExp(search_keyword, 'i')
  const search_results = persons.filter( person => re.test(person.name) ) // (search_keyword) ? persons.filter( person => re.test(person.name) ) : []
  
  
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


  // const notesToShow = showAll ? notes : notes.filter( note => note.important )


  //--- ------------------------------------
  return (
    <div>

      <h1>Phonebook</h1>

      <hr />

      <h2>Search</h2>
      <div>
          Filter shown with: <input type     = "text"
                                    value    = { search_keyword }
                                    onChange = { search_keyword_onChange }/>
      </div>
      {/* <h4>Results</h4>
      <ul>{
        (search_results.length === 0) ?
        'No results' :
        search_results.map( result => <Person key = { result.id } person = { result } /> )
      }</ul> */}
      
      <hr />

      <h2>Add new</h2>
      <form onSubmit={ addName }>
        <div>
          <span title="Pakollinen kenttä">Name*: </span>
          <input type        = "text"
                 placeholder = 'A new name...'
                 value       = { newName }
                 onChange    = { handleNewName }/>
        </div>      
        <div>
          Number: <input type       = "text"
                         placeholder = '... and number if needed'
                         value       = { newNumber }
                         onChange    = { handleNewNumber }/>
        </div>
        <div><button type="submit">Add</button></div>
      </form>

      {/* <div>_DEV_DEBUG: { newName }</div> */}

      <h4>{(search_keyword) ? 'Search results' : 'All numbers' }</h4>
      <ul>{
        (search_results.length === 0) ?
        'No results' :
        search_results.map( result => <Person key = { result.id } person = { result } /> )
      }</ul>
      {/* <ul>{ persons.map( person => <Person key = { person.id } person = { person } /> ) }</ul> */}

    </div>
  )


}

//---
export default App