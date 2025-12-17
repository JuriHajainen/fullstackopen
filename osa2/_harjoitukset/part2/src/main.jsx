// import { StrictMode } from 'react'
// import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'


//--- | --------------------------------------------------------------

ReactDOM.createRoot(document.getElementById('root')).render(<App />) // OLD: <App notes = { notes } />
// const root = ReactDOM.createRoot(document.getElementById('root'))


/* axios
   .get('http://localhost:3001/notes')
   .then(response => {
     const notes = response.data
     // console.log(notes)
     ReactDOM.createRoot(document.getElementById('root')).render(<App />)
})*/


// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)


//--- | --------------------------------------------------------------


// const refresh = () => {
    // root.render(<App counter={ counter } />)
// }
// setInterval(() => {
    // refresh()
    // counter += 1
// }, 1000);


//--- | --------------------------------------------------------------

// let counter = 1

// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true
//   }
// ]

