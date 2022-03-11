import { useState,useEffect } from "react";
import axios from 'axios';


const App = () => {

  useEffect(() => {

    const promise = axios.get('https://restcountries.com/v3.1/all')
    promise.then(r => {
      setData(r.data)
    })

  },[])


  const [weatherData,setWeatherData] = useState('')
  const [data,setData] = useState()
  const [filter,setFilter] = useState('')

  if (data) {
    return(
      <>
      <div>find countries</div><input onChange={(e) => setFilter(e.target.value.toLowerCase())}></input>
      <ul style={{listStyleType : 'none'}}>
        <ListCountries weatherData={weatherData} setWeatherData={setWeatherData} countries={data} filter={filter} setFilter={setFilter}/>
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

const ListCountries = ({weatherData,setWeatherData,setFilter,filter,countries}) => {
  let loadweatherdata = false
  let countries_to_show = countries.filter(c => c.name.official.toLowerCase().includes(filter))
  //console.log(countries_to_show);
  if (countries_to_show.length === 1){
    loadweatherdata = true
    return (
      <>
      <ShowCountry country={countries_to_show[0]}/>
      <Weather loadweatherdata = {loadweatherdata} weatherData={weatherData} setWeatherData={setWeatherData} country={countries_to_show[0]}/>
      </>
    )
  }
  else if (countries_to_show.length > 10){
    loadweatherdata = false
    return (
      <p>Too many matches</p>
    )
  } else {
    loadweatherdata = false
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

const Weather = ({loadweatherdata, weatherData,setWeatherData, country}) => {
  const apikey = process.env.REACT_APP_API_KEY
  //console.log('apikey', apikey)
  //console.log(country)
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${apikey}&units=metric`
  //console.log(url)

  useEffect(() => {
    axios
      .get(url)
      .then(r => {
        setWeatherData(r.data)
      }
        )
  
  },[loadweatherdata === true])
  //console.log(weatherData)
  if (weatherData) {
    const icon = weatherData.weather[0].icon
    //console.log(icon)
    return(
      <>
      <h2>weather in {country.capital}</h2>
      <div>temperature {weatherData.main.temp} Celcius</div>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}></img>
      <div>wind {weatherData.wind.speed} m/s</div>
      </>
    )
  } else {
    return (
      <div>Weatherdata is not ready yet</div>
    )
    
  }
  
}

export default App;
