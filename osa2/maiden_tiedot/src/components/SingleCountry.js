import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({city, weather}) => {
    //console.log(weather)
    return (
        <div>
            <h2>
                {`Weather in ${city}`}
            </h2>
            <b>temperature:</b> {weather.temperature} Celsius<br/>
            <img src={weather.imageUrl} alt={weather.imageAlt}/><br/>
            <b>wind:</b> {weather.windSpeed} direction {weather.windDir}
        </div>
    )
}

const languages = (props) => {
    //console.log(props)
    return (
        <ul>
            {props
                .map(lan => <li key={lan.iso639_2}>{lan.name}</li>)}
        </ul>
    )
}

const SingleCountry = ({country}) => {
    const [temperature, setTemperature] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [imageAlt, setImageAlt] = useState('')
    const [windSpeed, setWindSpeed] = useState('')
    const [windDir, setWindDir] = useState('')
    const weather = {temperature, imageAlt, imageUrl, windSpeed, windDir}

    useEffect(() => {
        axios
            .get(`http://api.apixu.com/v1/current.json?key=c3cae64bdadd4bb99ce195343191507&q=${country.capital}`)
            .then(response => {
                const data = response.data.current
                setTemperature(data.temp_c)
                setImageUrl(data.condition.icon)
                setImageAlt(data.condition.text)
                setWindSpeed(data.wind_kph)
                setWindDir(data.wind_dir)
            })
    },[country.capital])

    return (
        <div>
            <h1>{country.name}</h1>
            <p>
                capital {country.capital}<br/>
                population {country.population}<br/>
            </p>
            <h2>languages</h2>
            {languages(country.languages)}
            <img src={country.flag} alt={`Flag of ${country.name}`} width="200"/>
            <Weather city={country.capital} weather={weather} />

        </div>
    )
}

export default SingleCountry