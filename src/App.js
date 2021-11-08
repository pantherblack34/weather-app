import React, { useState } from 'react'
import location from './image/map(1).png'
import temp from './image/centigrade.png'
import humid from './image/humidity.png'
import press from './image/thermometer.png'
import wind from './image/windsock.png'

function App() {
  const apiKey = 'ec69eaab7d1dd592c2a334637808a1a4'

  const [weather, setWeather] = useState({})
  const [city, setCity] = useState('')

  const getWeather = (event) => {
    if(event.key === 'Enter'){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        setCity('')
        setWeather(data)
        console.log(data)
      })
    }
  }

  return (
    <div className={(typeof weather.main != 'undefined') ?
            ((weather.main.temp > 20) ? 'container-summer' : 'container-winter')
                  : 'container'}>
      <h1>Weather Status</h1>
        <input 
        type='text'
        className='input'
        placeholder='Enter the City....' 
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather} />
        
       <div className="weather-info">
         {
          (typeof weather.main === 'undefined') ? 
          <h2>ENTER A PLACE</h2>
          :
          <div>
            <div className='content1'><img src={location} alt='location' /> {weather.name}, {weather.sys.country}</div>
            <div className='content2'><img src={temp} alt='temperature' /> {Math.round(weather.main.temp)}</div>
            <div className='content3'><img src={humid} alt='humidity' /> {weather.main.humidity}%</div>
            <div className='content4'><img src={press} alt='pressure' /> {weather.main.pressure}</div>
            <div className='content5'><img src={wind} alt='windspeed' /> {weather.wind.speed}</div>
          </div>
         }
       </div>
    </div>
  )
}

export default App
