// -------------------------------------------
// -------------------------------------------

const Header = (props) => {

  return (
    <h1>{ props.course.name }</h1>
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
      <Part name = { props.course.parts[0].name } exercises = { props.course.parts[0].exercises }/>
      <Part name = { props.course.parts[1].name } exercises = { props.course.parts[1].exercises }/>
      <Part name = { props.course.parts[2].name } exercises = { props.course.parts[2].exercises }/>
    </>
  )

}


// -------------------------------------------
// -------------------------------------------

const Total = (props) => {

  return (
    <p>Number of exercises { props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises }</p>
  )

}


// -------------------------------------------
// -------------------------------------------

const App = () => {
  
  // 1.5
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  // 1.4
  // const course = 'Half Stack application development'
  // const parts = [
    // {
      // name: 'Fundamentals of React',
      // exercises: 10
    // },
    // {
      // name: 'Using props to pass data',
      // exercises: 7
    // },
    // {
      // name: 'State of a component',
      // exercises: 14
    // }
  // ]

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
      <Content course = { course } />
      <Total course = { course } />
    </div>
  )
}


export default App
