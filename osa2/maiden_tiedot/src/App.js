import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        //console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                //console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])
    //console.log('render', countries.length, 'countries')

    const showCountry = (event) => {
        //event.preventDefault()
        //console.log(event.target.value)
        setSearchString(event.target.value)
    }

    const handleSearchStringChange = (event) => {
        setSearchString(event.target.value)
    }

    return (
        <div>
            <Filter 
                value={searchString}
                onChange={handleSearchStringChange}/>
            <Countries 
                countries={countries}
                searchString={searchString}
                showCountry={showCountry}/>
        </div>
    )
}

export default App