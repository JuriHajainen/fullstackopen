import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'


//--- ------------------------------------------------
//--- ------------------------------------------------
const Button = (props) => <button onClick={ props.onClick }>{ props.text }</button>


//--- ------------------------------------------------
//--- ------------------------------------------------
const App = () => {

  const names = ['Good', 'Neutral', 'Bad']

  const [good, setGood]       = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad]         = useState(0)

  
  //--- METHODs ----------------------------
  const button_onClick = (status) => {
    return () => {
      switch (status) {
        case names[0]:
          setGood(good + 1)
          break
        case names[1]:
          setNeutral(neutral + 1)
          break
        case names[2]:
          setBad(bad + 1)
          break
        default:
          console.log('ERROR: button_onClick switch status is not defined: ', status)
          break
      }
    }
  }

  
  //----------------------------------------
  return (
    <div>
      <div>
        <h2>Give feedback</h2>
        <Button onClick = { button_onClick(names[0]) } text = { names[0] } />
        <Button onClick = { button_onClick(names[1]) } text = { names[1] }/>
        <Button onClick = { button_onClick(names[2]) } text = { names[2] }/>
      </div>
      <div>
        <h2>Statistics</h2>
        <div>{ names[0] + ' ' + good }</div>
        <div>{ names[1] + ' ' + neutral }</div>
        <div>{ names[2] + ' ' + bad }</div>
      </div>
    </div>
  )
}

export default App
