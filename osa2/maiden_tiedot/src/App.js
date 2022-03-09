import { useState,useEffect } from "react";
import axios from 'axios'

const App = () => {

  useEffect(() => {

    const promise = axios.get('https://restcountries.com/v3.1/all')
    promise.then(r => {
      setData(r.data)
    })

  },[])


  const [data,setData] = useState()
  const [filter,setFilter] = useState('')
  const [weather,setWeather] = useState('')

  if (data) {
    return(
      <>
      <div>find countries</div><input onChange={(e) => setFilter(e.target.value.toLowerCase())}></input>
      <ul style={{listStyleType : 'none'}}>
        <ListCountries weather={weather} setWeather={setWeather} countries={data} filter={filter} setFilter={setFilter}/>
      </ul>
      </>
    )
  } else {
    return(
      <>
        <p>not done yet</p>
      </>
    )
  }
  
  
  
}

const ListCountries = ({weather,setWeather, setFilter,filter,countries}) => {
  let countries_to_show = countries.filter(c => c.name.official.toLowerCase().includes(filter))
  //console.log(countries_to_show);
  if (countries_to_show.length === 1){
    return (
      <>
      <ShowCountry country={countries_to_show[0]}/>
      <Weather country={countries_to_show[0],weather={weather}, setWeather={setWeather}}/>
      </>
    )
  }
  else if (countries_to_show.length > 10){
    return (
      <p>Too many matches</p>
    )
  } else {
    return (
      <>
      {countries_to_show.map(c => <li key={c.name.common}>{c.name.common}<button onClick={() => setFilter(c.name.common.toLowerCase())}>Show</button></li>)}
      </>
    )
  }
  
}

const ShowCountry = ({country}) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h2>languages:</h2>
      {console.log(country)}
      <ul>
      {Object.values(country.languages).map(c => <li key={c}>{c}</li>)}
      </ul>
      <br></br>
      <div>
      <img src={country.flags.png}></img>
      </div>
      
    </>
  )
}

const Weather = ({weather,setWeather,country}) => {
  const apikey = process.env.REACT_APP_API_KEY
  const lat = country.capitalInfo.latlng[0]
  const lon = country.capitalInfo.latlng[1]
  //console.log(country.capitalInfo.latlng[0])
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`
  //console.log(url)
  useEffect(() => {
    const promise = axios.get(url)
    .then(r => setWeather(r.data))

  },[country])
  return(
    <>
    <h2>weather in {country.capital}</h2>
    <div>temperature {} celsius</div>
    </>
  )
}

export default App;
