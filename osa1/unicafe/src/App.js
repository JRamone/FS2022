import { useState,useEffect } from "react"

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}
const StatisticsLine = ({text, value, sufix}) => {
  return (
  <tr>
    <td width={120}>{text}</td><td width={120}> {value}{sufix}</td>
  </tr>
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
  //I ALREADY MADE THIS!
  let all = good + bad + neutral
  if (all == 0) return <h1>no feedback given</h1>
  return (
    <>
    <table>
      <thead>
        <tr>
          <th style={{fontSize: 40}} >statistics</th>
        </tr>
      </thead>
      <tbody>
            <StatisticsLine text={'good'} value={good}/>
            <StatisticsLine text={'neutral'} value={neutral}/>
            <StatisticsLine text={'bad'} value={bad}/>
            <StatisticsLine text={'all'} value={all}/>
            <StatisticsLine text={'average'} value={(good - bad)/all}/>
            <StatisticsLine text={'positive'} value={good * 100/all} sufix={'%'}/>
      </tbody>
    </table>
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
