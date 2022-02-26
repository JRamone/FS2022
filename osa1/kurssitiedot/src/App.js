
const App = () => {

  const course = 'Half Stack Application Development'
  const parts = [
    {
      name : 'Fundamentals of React',
      exercises : 10
    },
    {
      name : 'Using props to pass data',
      exercises : 7
    },
    {
      name : 'State of component',
      exercises : 14
    }
  ]
  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}
const Content = (props) => {
  //console.log(props)
  return (
    <>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </>
    
  )
}

const Part = (props) => {
  return (
    <>
    <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Total = (props) => {
  //console.log(props.parts)
  return (
    <p>Number of exercises {props.parts.map(part => part.exercises).reduce((a,b) => a+b,0)}</p>
  )
}

export default App
