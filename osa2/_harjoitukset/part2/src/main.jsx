// import { StrictMode } from 'react'
// import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App'


//--- | --------------------------------------------------------------

// let counter = 1

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]


//--- | --------------------------------------------------------------

// const root = ReactDOM.createRoot(document.getElementById('root'))
ReactDOM.createRoot(document.getElementById('root')).render(<App notes = { notes } />)

// const refresh = () => {
    // root.render(<App counter={ counter } />)
// }
// setInterval(() => {
    // refresh()
    // counter += 1
// }, 1000);
