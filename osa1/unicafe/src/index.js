import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistic = ({name, value}) => (
    <tr>
        <td>{name}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({title, good, neutral, bad}) => {
    const total = good + neutral + bad
    const average = (good-bad)/total
    const positive = String(100*good/total).concat(' %')
    if (total > 0) {
        return (
            <table>
                <tbody>
                <Statistic name='good' value={good} />
                <Statistic name='neutral' value={neutral} />
                <Statistic name='bad' value={bad} />
                <Statistic name='total' value={total} />
                <Statistic name='average' value={average} />
                <Statistic name='positive' value={positive} />
                </tbody>
            </table>
        )
    }

    return (
        <p>No feedback given</p>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const incrementGood = () => setGood(good + 1)
    const incrementNeutral = () => setNeutral(neutral + 1)
    const incrementBad = () => setBad(bad + 1)

    return (
        <div>
            <Header text='give feedback' />
            <Button onClick={incrementGood} text='good' />
            <Button onClick={incrementNeutral} text='neutral' />
            <Button onClick={incrementBad} text='bad' />
            <Header text='statistics' />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));