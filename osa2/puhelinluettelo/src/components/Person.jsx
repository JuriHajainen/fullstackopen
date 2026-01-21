const Person = ({ person, person_delete }) => {
  // console.log('person.id from Person', person.name, person.id)
  return <li>{ person.name } { ( person.number ) ? person.number : '--- no number ---' } <button onClick={ person_delete }>delete</button></li>
}

export default Person