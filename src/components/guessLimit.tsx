import React from "react";

const GuessLimit = ({guessLimit}: {guessLimit:number}) => {

    return (
        <>
        {!!guessLimit && <div className="remaining">You have <span className="danger">{guessLimit} incorrect guesses</span> remaining.</div>}
        </>
    )
}

export default GuessLimit;