import React from 'react'
import Country from './Country'
import SingleCountry from './SingleCountry'

const Countries = ({countries, searchString, showCountry}) => {

    const filtered = countries
        .filter(country => country.name
            .toLowerCase()
            .search(searchString
                .toLowerCase()
            )
            >= 0    // search returns -1 if not found
        )
    const mapped = filtered
        .map(country =>
            <Country
                country={country}
                showCountry={showCountry}
                key={country.name}
            />
            
    )
    //console.log(searchString)
    //console.log(filtered)

    const len = mapped.length
    if (len === 1) {
        return (
            <SingleCountry country={mapped[0].props.country}/>
        )
    }
    else if (len < 11) {
        return (
            <>
                {mapped}
                
            </>
        )
    }
    else return "Too many matches, specify another filter"
}

export default Countries