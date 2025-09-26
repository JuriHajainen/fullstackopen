// import { /*useEffect,*/ useState } from "react"


// -------------------------------------------
// -------------------------------------------

const Header = ({ name }) => {

  return (
    <h1>{ name }</h1>
  )

}


// -------------------------------------------
// -------------------------------------------

const Part = ( { name, exercises } ) => {
  return (
    <li>{ name } { exercises }</li>
  )
}


// -------------------------------------------
// -------------------------------------------

const Content = ( { parts } ) => {
    
  return (
    <ul>
      {
        parts.map(
          part => <Part key       = { part.id }
                        name      = { part.name }
                        exercises = { part.exercises }/>
        )
      }
    </ul>
  )

}


// -------------------------------------------
// -------------------------------------------

const Total = ( { parts } ) => {

  // const [ total, setTotal ] = useState(0)
  // let total = 0
  
  const total = () => {
    
    /* V3 */
    let t = parts.map(part => part.exercises).reduce( (a,b) => a + b, 0 )
    
    return (t > 0) ?
      ('Total of ' + t + ' exercise' + ( t > 1  ? 's': '')) :
      ('No exercises were done yet')
    
    /* V2 */
    // return parts.map(part => part.exercises).reduce( (a,b) => a + b, 0 )
    
    /* V1 */
    // let t = 0
    // parts.forEach(
    //   part => {
    //     console.log('Exercises-' + part.id + ':', part.exercises )
    //     t = t + part.exercises
    //     console.log('total:', t)
    //   }
    // )
    // return t

  }


  return (
    <p>
      <b>{ total() }</b>
      {/* <b>Total of { parts.map(part => part.exercises).reduce( (a,b) => a + b, 0 ) } exercises</b> */}
    </p>
  )

}


// -------------------------------------------
// -------------------------------------------

const Course = ( { course } ) => {

  return (
    <>
      <Header name = { course.name }></Header>
      <Content parts = { course.parts }></Content>
      <Total parts = { course.parts }></Total>
    </>
  )

}


export default Course
