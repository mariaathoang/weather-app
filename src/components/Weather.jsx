import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search_icon.png'
import cloudy from '../assets/cloudy.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import sunny from '../assets/sunny.png'
import snow from '../assets/snow.png'
import wind_icon from '../assets/wind_icon.png'


const Weather = () => {

    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        "01d": sunny,
        "01n": sunny,
        "02d": cloudy,
        "02n": cloudy,
        "03d": cloudy,
        "03n": cloudy,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,

    }

    const search = async (city) => {
        if (city === "") {
            alert("Please enter a city name.");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || sunny;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data.");
        }
    }

    useEffect(() => {
        search("Tokyo");
    },[])
  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Search...' />
        <img src={search_icon} alt='' onClick={() => search(inputRef.current.value)} />
      </div>

      {weatherData?<>
      <img src={weatherData.icon} alt='' className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidity} alt='' />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={wind_icon} alt='' />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
      </>:<></>}  {/* If API doesn't work, hide fragment */}

        
    </div>
  )
}

export default Weather
