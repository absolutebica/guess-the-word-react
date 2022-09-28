import React, { useCallback, useEffect, useState } from "react";
import { SplitWordLetterProps } from "../@types";
import Button from "../components/button";
import Guess from "../components/guess";
import Loader from "../components/loader";
import RandomWord from "../components/randomWord";
import WrongGuesses from "../components/wrongGuesses";
import GameService from "../service/gameService";


const Game = ({userName}: {userName:string}) => {
    const [randomWord, setRandomWord] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [splitWordLetters, setSplitWordletters] = useState<SplitWordLetterProps[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
    const [guessLimit, setGuessLimit] = useState<number>(6);
    const [hasWrongGuess, setHasWrongGuess] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const DEFAULT_MESSAGE = `${userName}, welcome to Guess the Word`;
    const SUCCESS_MESSAGE = "I can't believe you won. Great job Einstein!";
    const FAIL_MESSAGE = `Sorry! No soup for you! The word was ${randomWord}`;
    const [message, setMessage] = useState(DEFAULT_MESSAGE);


    useEffect(() => {
        fetchRandomWord();
    }, []);


    const handleGuess = (letter:string) => {
        const regexp = new RegExp(letter, "g");
		const selectedWordletterMatchesCount:number = (randomWord.match(regexp) || []).length;
		const correctLetterGuessCount = findLetter(letter).length;
        
		const hasWrongMatch = !!wrongGuesses?.filter(guess => guess.toLowerCase() === letter.toLowerCase()).length;

		if (hasWrongMatch || (selectedWordletterMatchesCount && correctLetterGuessCount >= selectedWordletterMatchesCount)) {
			setHasWrongGuess(true);
		} else {
			if (selectedWordletterMatchesCount) {
				updateCorrectLetter(letter);
				checkIfWinner();
			} else {
				setGuessLimit(guessLimit - 1);
				setWrongGuesses([...wrongGuesses, letter]);
			}
            console.log(!!selectedWordletterMatchesCount);
			setHasWrongGuess(!selectedWordletterMatchesCount);
		}

        if (!guessLimit) {
            setMessage(FAIL_MESSAGE);
            setIsGameOver(true);
        }
    }

    const findLetter = (letter:string, isUsed = true) => {
        const results = splitWordLetters.filter(wordLetter => {
            const isLetterUsed = isUsed ? wordLetter.isUsed : !wordLetter.isUsed;
            return wordLetter.letter.toLowerCase() === letter.toLowerCase()
            && isLetterUsed;
        });

        return results;
    }

    const updateCorrectLetter = (letter:string) => {
        const findValidLetter = findLetter(letter, false)[0];
        const updateLetters = splitWordLetters.map(wordLetter => 
            (wordLetter.index === findValidLetter.index ? 
                {...wordLetter, isUsed: true} :
                wordLetter)
        );

        setSplitWordletters(updateLetters);
        setHasWrongGuess(false);
    }

    const checkIfWinner = () => {
        const isWinner = guessLimit && !splitWordLetters.filter(wordLetter => !wordLetter.isUsed).length;
		if (isWinner) {
            setMessage(SUCCESS_MESSAGE);
            setIsGameOver(true);
        }
    }

    const onNewGame = () => {
        setIsLoading(true);
        setIsGameOver(false);
        fetchRandomWord();
        setWrongGuesses([]);
        setHasWrongGuess(false);
    }

    const fetchRandomWord = useCallback(async () => {
        const Service = GameService();
        let word:string = await Service.getRandomWord();

        if (word?.length) {
            word = word[0];
            console.log(word);
            setRandomWord(word);
            setGuessLimit(word.length + 2); // add 2 to the length of the word for extra guesses
            getLetters(word)
            setIsLoading(false);
            setHasWrongGuess(false);
        }
    }, [randomWord, splitWordLetters, isLoading]);

    const getLetters = (word:string) => {
		const wordSplitArray = word.split('');
		const letters = wordSplitArray.map((letter:string, index:number) => {
			return {
				letter: letter,
				index: index,
				isUsed: false
			};
        });

        setSplitWordletters(letters);
	}

    const onHandleNewGame = () => onNewGame();

    return (
        <div className="game-container">
            <h3>{message}</h3>
            {isLoading ? <Loader /> :
            <>
                {isGameOver ? <Button onClick={onHandleNewGame}>New Game</Button> : 
                <>
                    <RandomWord letters={splitWordLetters} />
                    {!!guessLimit && <div className="remaining">You have <span className="danger">{guessLimit} incorrect guesses</span> remaining.</div>}
                    {!!wrongGuesses?.length && <WrongGuesses letters={wrongGuesses} />}
                    {hasWrongGuess && <div className="already-guessed">Letter already guessed</div>}
                    <Guess onGuess={handleGuess} />
                </>
                }
                
            </>
            }
        </div>
    );
}

export default Game;
