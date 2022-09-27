import React, { useState } from "react";
import { GuessProps } from "../@types";
import Button from "./button";


const Guess:React.FC<GuessProps> = ({onGuess}) => {
    const [guessedLetter, setGuessedLetter] = useState('');

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setGuessedLetter(value);
    }

    const validateInput = (event: React.KeyboardEvent) => {
        const isValid = /^[a-zA-Z]+$/.test(event.key);
	
		if (!isValid) {
			event.preventDefault();
			return false;
		}
    }

    const handleEnter = (event:React.KeyboardEvent) => {
        const isEnterKey = event.key === "Enter";
		if (isEnterKey) {
			guessCheck();
		}
    }

    const handleGuess = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        guessCheck();
    }

    const guessCheck = () => {
        if (guessedLetter) {
            onGuess(guessedLetter);
            setGuessedLetter('');
            (document.querySelector(".input-letter") as HTMLInputElement).focus();
        }
    }

    return (
        <div className="form-container">
            <label htmlFor="letter">Type one letter:</label>
            <input 
                type="text" 
                name="letter" 
                value={guessedLetter} 
                className="input-letter" 
                maxLength={1} 
                onKeyPress={validateInput} 
                onKeyDown={handleEnter}
                onChange={handleChange} 
            />
            <Button onClick={handleGuess}>Guess!</Button>
        </div>
    );
}

export default Guess;