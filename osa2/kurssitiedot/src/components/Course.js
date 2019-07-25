import React from 'react';

const Header = (props) => {
    return (
        <>
            <h2>{props.course}</h2>
        </>
    )
}

const Part = (props) => {
    //console.log(props)
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Content = ({parts}) => {
    //console.log(parts)
    const mapped = () => parts.map(part =>
        <Part 
            key={part.id}
            part={part}
        />
    )
    return (
        <>
            {mapped()}
        </>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </div>
        
    )
}

const Total = ({parts}) => {
    //console.log(parts)
    const mapped = () => parts
        .map(part => part.exercises)
        .reduce((a, b) => a+b)
        
    return (
        <p>total of {mapped()} exercises</p>
    )
}

export default Course