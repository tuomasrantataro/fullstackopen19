import React, {useState, useEffect} from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
//import './index.css'

const Notification = ({message}) => {
    const notificationStyle = {
        display: 'grid',
        color: 'green',
        background: '#DDDDDD',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

const ErrorMessage = ({message}) => {
    const notificationStyle = {
        display: 'grid',
        color: 'red',
        background: '#DDDDDD',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (message === null) {
        return null
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}



const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchString, setSearchString] = useState('')
    const [statusMessage, setStatusMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    //console.log('render', persons.length, 'persons')
 
    // lukee state -muuttujien arvot vain funktiota kutsuttaessa
    
    const addPerson = (event) => {
        event.preventDefault()
        //console.log(event.target)
        const personObject = {
            name: newName,
            number: newNumber
        }

        if (persons.map(person => person.name).includes(newName)) {
        
            const id = persons.find(person => person.name === newName).id
            //console.log(id)
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update(id, personObject)
                    .then(() => {
                        setStatusMessage(
                            `Updated number for ${personObject.name}`
                        )
                        setTimeout(() => {
                            setStatusMessage(null)
                        }, 5000)
                        personService
                            .getAll()
                            .then(newPersons => {
                                setPersons(newPersons)
                        })
                    })
                    .catch(() => {
                        setErrorMessage(
                            `Information of ${personObject.name} has already been removed from server`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                        personService
                            .getAll()
                            .then(newPersons => {
                                setPersons(newPersons)
                        })
                    })
            }
        }
        else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setStatusMessage(
                        `Added ${personObject.name}`
                    )
                    setTimeout(() => {
                        setStatusMessage(null)
                    }, 5000)
                })
            
        }
    
    }

    const removePerson = (event) => {
        event.preventDefault()
        const target = event.target
        //console.log(target.id)
        if (window.confirm(`Delete ${target.value} ?`)) {
            personService.remove(target.id)
            .then(() => {
                //console.log(target)
                setStatusMessage(
                    `Removed ${target.value}`
                )
                setTimeout(() => {
                    setStatusMessage(null)
                }, 5000)
                personService
                    .getAll()
                    .then(initialPersons => {
                        setPersons(initialPersons)
                    })
            })
            .catch(error => {
                setErrorMessage(
                    `Information of ${target.value} has already been removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                personService
                    .getAll()
                    .then(newPersons => {
                        setPersons(newPersons)
                })
            })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleSearchStringChange = (event) => {
        //console.log(event.target.value)
        setSearchString(event.target.value)
    }  
    
    

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={statusMessage} />
            <ErrorMessage message={errorMessage} />
            <Filter 
                value={searchString}
                onChange={handleSearchStringChange}/>
            <h3>Add a new</h3>
            <PersonForm 
                addPerson={addPerson}
                nameValue={newName}
                onNameChange={handleNameChange}
                numberValue={newNumber}
                onNumberChange={handleNumberChange}/>
            <h3>Numbers</h3>
            <Persons 
                persons={persons}
                searchString={searchString}
                removePerson={removePerson}/>
        </div>
    )
}

export default App