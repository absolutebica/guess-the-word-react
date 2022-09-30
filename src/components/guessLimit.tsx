import React from "react";

const GuessLimit = ({guessLimit, onRefresh}: {guessLimit:number, onRefresh:() => void}) => {

    const handleRefresh = () => {
        onRefresh();
    }

    return (
        <>
        {!!guessLimit && 
        <div className="d-flex remaining">
            <span>You have <span className="danger">{guessLimit} incorrect guesses</span> remaining. </span>
            <span onClick={handleRefresh} className="material-button material-icons">refresh</span>
        </div>
        }
        </>
    )
}

export default GuessLimit;