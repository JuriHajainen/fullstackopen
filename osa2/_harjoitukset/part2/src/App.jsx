// import './App.css'
import { useState, useEffect } from 'react'
import Note                    from './components/Note'
import noteService             from './services/notes'
// import axios                   from 'axios'


//--- NOTE ------------------------------------------------

// const Note = ({ note }) => {
//   return (
//     <li>{ note.content }</li>
//   )
// }


//--- APP ------------------------------------------------

const App = () => {

  //--- DATAs: -----------------------------------------
  const [ notes, setNotes ]     = useState([])
  const [ newNote, setNewNote ] = useState('A new note...')
  const [ showAll, setShowAll ] = useState(true)
  

  //--- METHODs: -----------------------------------------

  //--- --------------------------
  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
    }
     
  //--- --------------------------
  useEffect(hook, [])
  // console.log('Render', notes.length, 'notes')

  //--- --------------------
  const addNote = (ev) => {

    ev.preventDefault()
    // console.log('Button clicked', ev.target)

    const noteObj = {
      content: newNote,
      important: Math.random() > 0.5,
      // id: String(notes.length + 1) // S does it, not F
    }

    // setNotes(notes.concat(noteObj))
    // setNewNote('')

    noteService
      .create(noteObj)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  //--- --------------------------
  const handleNoteChange = (ev) => {
    console.log(ev.target.value)
    setNewNote(ev.target.value)
  }

  //--- --------------------------
  const notesToShow = showAll ? notes : notes.filter( note => note.important )

  //--- --------------------------
  const toggleImportanceOf = (id) => {

    // console.log(`importance of ${ id } needs to be toggled`)
    // const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
          `the note '${ note.content }' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })

  }


  //--- ------------------------------------
  return (
    <div>

      <h1>Notes</h1>

      <div>
        <button onClick = { () => setShowAll(!showAll) }>Show { showAll ? 'important' : 'all' }</button>
      </div>

      <ul>
        {
          notesToShow.map( note =>
                             <Note key              = { note.id }
                                   note             = { note }
                                   toggleImportance = { () => toggleImportanceOf(note.id) } />
                         )
        }
      </ul>

      <form onSubmit={ addNote }>
        <input type     = "text"
               value    = { newNote }
               onChange = { handleNoteChange }/>
        <button type="submit">add</button>
      </form>

    </div>
  )


}

//---
export default App