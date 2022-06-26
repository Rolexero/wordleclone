import React from 'react'

const Wordle = ({ data }) => {
    const randomWords = data && data[Math.floor(Math.random() * data.length)]
    return <div > { randomWords } < /div>;
}

export default Wordle