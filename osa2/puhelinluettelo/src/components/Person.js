import React from 'react'

const Person = (props) => {
    //console.log(props)
    return (
        <>
            {props.person.name} {props.person.number}
            <button type="button" onClick={props.removePerson} id={props.person.id} value={props.person.name}>
                delete
            </button><br/>
        </>
    )  
}

export default Person