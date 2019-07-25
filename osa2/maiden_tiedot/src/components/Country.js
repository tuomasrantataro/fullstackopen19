import React from 'react'



const Country = (props) => {
    //console.log(props)

    return (
        <div>
            {props.country.name}
            <button type="button" onClick={props.showCountry} value={props.country.name}>
                show
            </button>
        </div>
    )  
}

export default Country