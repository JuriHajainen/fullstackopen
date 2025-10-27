const PersonForm = (
  {
    addName,
    newName,
    handleNewName,
    newNumber,
    handleNewNumber
  }
) => {

  return (

    <>
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
    </>
  )
}

export default PersonForm