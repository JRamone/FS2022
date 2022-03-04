import { useState,useEffect } from "react"

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Feedback = ({good,setGood,bad,setBad,neutral,setNeutral}) => {
  return (
  <> 
  <h1>give feedback</h1>
  <Button text={'good'} onClick={() => setGood(good + 1)}/>
  <Button text={'neutral'} onClick={() => setNeutral(neutral + 1)}/>
  <Button text={'bad'} onClick={() => setBad(bad + 1)}/>
  </>
  )
}

const Statistics = ({good,neutral,bad}) => {
  return (
    <>
    <h1>statistics</h1>
    <h3>good {good}</h3>
    <h3>neutral {neutral}</h3>
    <h3>bad {bad}</h3>
    <h3>all {good + bad + neutral}</h3>
    <h3>average {(good - bad)/(good+bad+neutral)}</h3>
    <h3>positive {good * 100/(good+bad+neutral)} %</h3>
    </>
  )
  
}

const App = () => {
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  return (
    <>
    <Feedback good={good} bad={bad} neutral={neutral}
    setGood={setGood} setBad={setBad} setNeutral={setNeutral}/>
    <Statistics good={good} bad={bad} neutral={neutral}/>
    </>
  )
}

export default App;
