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

export {Content, Course, Part, Header, Total}