import React from 'react';

const WrongGuesses = ({letters}: {letters:string[]}) => {
    return (
        <>
            {!!letters?.length &&
            <ul className="guessed-letters">
                {letters.map((letter, index) => <li key={`${letter}-${index}`}>{letter}</li>)}
            </ul>
            }
        </>
    )
}

export default WrongGuesses;