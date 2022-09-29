import React from "react";

const AlreadyGuessed = ({hasWrongGuess}: {hasWrongGuess:boolean}) => {

    return (
        <>
        {!!hasWrongGuess && <div className="already-guessed">Letter already guessed</div>}
        </>
    )
}

export default AlreadyGuessed;