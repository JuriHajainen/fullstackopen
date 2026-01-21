import Person from './Person'

const Persons = (
  {
    search_keyword,
    search_results,
    person_delete
  }
) => {


  return (

    <>
      <h4>{ (search_keyword) ? 'Search results' : 'All numbers' }</h4>
      <ul>{
        (search_results.length === 0) ?
        'No results' :
        search_results.map( result => <Person key = { result.id }
                                              person = { result }
                                              person_delete = { () => person_delete(result.id, result.name) } /> )
      }</ul>
      {/* <ul>{ persons.map( person => <Person key = { person.id } person = { person } /> ) }</ul> */}
    </>
  )
}

export default Persons