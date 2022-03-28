import React, { useState } from 'react';
import axios from 'axios';
import './App.scss';

function App() {
  const apikey= "9a68e6615af5c38cde19038a34e4569b";
  const url= "https://api.openweathermap.org/data/2.5/weather";

  const [city, setQuery] = useState('');
  const [weatherData, setWeather] = useState({});

  const dataBuilder = (d) => {
      let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
      let days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`
    }
  const WeatherFunc = async (city) => {
  const { data } = await axios.get(url, {
              params: {
              q: city,
              units: 'metric',
              APPID: apikey,
          }
      });
      return data;
    }

  const search = async (event) => {
      if(event.key === 'Enter') {
          const data = await WeatherFunc(city);
          setWeather(data);
          setQuery('');
      }
  }
  return (
        <div className='container'>
            <div className="search-box">
              <input 
                type="text"
                className="search-bar"
                placeholder="Введите название города"
                onChange={event => setQuery(event.target.value)}
                value={city}
                onKeyPress={search}
              />
            </div>
            {(typeof weatherData.main != "undefined") ? (
            <div className='big-box'>
              <div className="location-box">
                <div className="location">{weatherData.name}, {weatherData.sys.country}</div>
                <div className="date">{dataBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weatherData.main.temp)}°c
                </div>
                <div className="weather">{weatherData.weather[0].main} </div>
                <img className="city-icon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
              </div>
            </div>
            ) : ('')}
        </div>
      );
    }
export default App;
