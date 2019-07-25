import React from 'react'

const PersonForm = (props) => {
    const {
        addPerson,
        nameValue,
        onNameChange,
        numberValue,
        onNumberChange
    } = props
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input 
                    value={nameValue}
                    onChange={onNameChange} />
            </div>
            <div>
                number: <input
                    value={numberValue}
                    onChange={onNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm