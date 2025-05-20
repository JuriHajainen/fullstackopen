import { useState/*, useEffect*/ } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'


//--- ------------------------------------------------
//--- ------------------------------------------------
const Button = (props) => <button onClick={ props.onClick }>{ props.text }</button>


//--- ------------------------------------------------
//--- ------------------------------------------------
const Statistics = (props) => {

  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <div>No feedback given</div>
      </div>
    )
  }

  return (
  <div>
    <h2>Statistics</h2>
    <div>{ props.names[0] + ' ' + props.good }</div>
    <div>{ props.names[1] + ' ' + props.neutral }</div>
    <div>{ props.names[2] + ' ' + props.bad }</div>
    <div>ALL: { props.all }</div>
    <div>Average: { props.average }</div>
    <div>Positive: { props.goodInPercentage } %</div>
  </div>
  )

}

//--- ------------------------------------------------
//--- ------------------------------------------------
const App = () => {

  const names        = ['Good', 'Neutral', 'Bad']
  const increasement = 1

  const [good, setGood]                         = useState(0)
  const [neutral, setNeutral]                   = useState(0)
  const [bad, setBad]                           = useState(0)
  const [all, setAll]                           = useState(0)
  const [average, setAverage]                   = useState(0)
  const [goodInPercentage, setGoodInPercentage] = useState(0)


  // useEffect(() => {
  //   setAll(good + neutral + bad)
  //   setAverage( ((good - bad) / all).toFixed(2) )
  // }, [all, good, bad, neutral])

  
  //--- METHODs ---------------------------------------
  
  //--- Button Click event handler --------------------
  const button_onClick = (status) => {
    let increasementSet // For fixing asyn update of all etc
    return () => {
      switch (status) {
        case names[0]:
          setGood(good + increasement)
          increasementSet = 1 // For fixing asyn update of all etc
          break
          case names[1]:
            setNeutral(neutral + increasement)
          increasementSet = 0 // For fixing asyn update of all etc
          break
        case names[2]:
          setBad(bad + increasement)
          increasementSet = -1 // For fixing asyn update of all etc
          break
        default:
          console.log('ERROR: button_onClick switch status is not defined: ', status)
          break
        }
        feedback_allSet()
        feedback_averageSet(increasementSet)
        feedback_goodInPercentageSet(status)
    }
  }

  //--- Count ALL Feedbacks ------------------------
  const feedback_allSet = () => {
    setAll(good + neutral + bad + increasement)
  }
  
  //--- Count average ------------------------
  const feedback_averageSet = (increasementSet) => {
    // console.log('ALL: ', all)
    setAverage( ((good - bad + increasementSet) / (all + increasement)).toFixed(2) )
  }

  //--- Count "good" percentage from total ------------------------
  const feedback_goodInPercentageSet = (status) => {
    setGoodInPercentage((100 * (good + (status === 'Good' ? increasement : 0)) / (all + increasement)).toFixed(2))
  }
  
  
  //----------------------------------------
  return (
    <div>

      <div>
        <h2>Give feedback</h2>
        <Button onClick = { button_onClick(names[0]) } text = { names[0] } />
        <Button onClick = { button_onClick(names[1]) } text = { names[1] } />
        <Button onClick = { button_onClick(names[2]) } text = { names[2] } />
      </div>

      <Statistics names            = { names }
                  good             = { good } 
                  neutral          = { neutral } 
                  bad              = { bad } 
                  all              = { all } 
                  average          = { average } 
                  goodInPercentage = { goodInPercentage }  />

    </div>
  )
}

export default App
