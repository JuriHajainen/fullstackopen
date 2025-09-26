// import { useState } from 'react'
// import './App.css'
import Note from './components/Note'


//--- NOTE ------------------------------------------------

// const Note = ({ note }) => {
//   return (
//     <li>{ note.content }</li>
//   )
// }


//--- APP ------------------------------------------------

const App = ({ notes }) => {

  // const { notes } = props
  console.log( notes.map( note => note.content ) )

  return (
    <div>
      <h1>Notes</h1>
      <ul>{ notes.map( note => <Note key = { note.id } note = { note } /> ) }</ul>
    </div>
  )

}

//---
export default App