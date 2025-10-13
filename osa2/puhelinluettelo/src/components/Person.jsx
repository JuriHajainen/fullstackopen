const Person = ({ person }) => {
  console.log('person.id from Person', person.name, person.id)
  return <li>{ person.name }</li>
}

export default Person