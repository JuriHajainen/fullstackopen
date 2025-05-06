// -------------------------------------------
// -------------------------------------------

const Header = (props) => {

  return (
    <h1>{ props.course }</h1>
  )

}


// -------------------------------------------
// -------------------------------------------

const Content = (props) => {

// console.log('Content\'s props: ' + props)

  const Part = (props) => {
    return (
      <p>{ props.name } {props.exercises }</p>
    )
  }
    
  return (
    <>
      <Part name = { props.parts[0].name } exercises = { props.parts[0].exercises }/>
      <Part name = { props.parts[1].name } exercises = { props.parts[1].exercises }/>
      <Part name = { props.parts[2].name } exercises = { props.parts[2].exercises }/>
    </>
  )

}


// -------------------------------------------
// -------------------------------------------

const Total = (props) => {

  return (
    <p>Number of exercises { props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises }</p>
  )

}


// -------------------------------------------
// -------------------------------------------

const App = () => {

  const course = 'Half Stack application development'
  // 1.4
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  // 1.3
  // const part1 = {
    // name: 'Fundamentals of React',
    // exercises: 10
  // }
  // const part2 = {
    // name: 'Using props to pass data',
    // exercises: 7
  // }
  // const part3 = {
    // name: 'State of a component',
    // exercises: 14
  // }
  
  // 1.2 
  // const course  = 'Half Stack application development'
  // const content = {
    // part1:      'Fundamentals of React',
    // exercises1: 10,
    // part2:      'Using props to pass data',
    // exercises2: 7,
    // part3:      'State of a component',
    // exercises3: 14
  // }

  return (
    <div>
      <Header course = { course } />
      <Content parts = { parts } />
      <Total parts = { parts } />
    </div>
  )
}


export default App
