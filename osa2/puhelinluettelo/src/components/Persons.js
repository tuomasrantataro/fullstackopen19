import React from 'react'
import Person from './Person'

const Persons = ({persons, searchString, removePerson}) => {
    return (
        persons
        .filter(person => person.name
            .toLowerCase()
            .search(searchString)
            >= 0    // search returns -1 if not found
        )
        .map(person =>
            <Person
                person={person}
                key={person.name}
                removePerson={removePerson}
            />
        )
    )
}

export default Persons