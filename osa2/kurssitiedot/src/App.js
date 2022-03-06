
const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
   
  return (
    <div>
      {courses.map(course => <Course key={course.id} course = {course}/>)}
    </div>
  )
}
const Content = ({parts}) => {
  //console.log(props)
  return (
    <>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>) }
    </>
    
  )
}

const Course = ({course}) => {
  //console.log(course)
  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

const Part = ({name, exercises}) => {
  return (
    <>
    <p>{name} {exercises}</p>
    </>
  )
}
const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({parts}) => {
  console.log(parts)
  return (
    <p style={{fontWeight : 'bold'}}>Total of {parts.map(part => part.exercises).reduce((a,b) => a+b,0)} exercises</p>
  )
}

export default App
