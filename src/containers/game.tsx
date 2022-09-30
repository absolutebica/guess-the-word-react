import React, { useCallback, useEffect, useState } from "react";
import { SplitWordLetterProps } from "../@types";
import AlreadyGuessed from "../components/alreadyGuessed";
import Button from "../components/button";
import Guess from "../components/guess";
import GuessLimit from "../components/guessLimit";
import Loader from "../components/loader";
import RandomWord from "../components/randomWord";
import WrongGuesses from "../components/wrongGuesses";
import GameService from "../service/gameService";
const DEFAULT_LIMIT = 6;

const Game = ({userName}: {userName:string}) => {
    const [randomWord, setRandomWord] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [splitWordLetters, setSplitWordletters] = useState<SplitWordLetterProps[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
    const [guessLimit, setGuessLimit] = useState<number>(DEFAULT_LIMIT);
    const [alreadyGuessed, setAlreadyGuessed] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const DEFAULT_MESSAGE = `${userName}, welcome to Guess the Word`;
    const SUCCESS_MESSAGE = "I can't believe you won. Great job Einstein!";
    const FAIL_MESSAGE = `Sorry! No soup for you! The word was ${randomWord}`;
    const NEW_GAME_MESSAGE = `${userName}, ready to go again?`;
    const [message, setMessage] = useState(DEFAULT_MESSAGE);

    useEffect(() => {
        fetchRandomWord();
    }, []);

    useEffect(() => {
        checkIfWinnerOrLoser();
    }, [guessLimit, splitWordLetters]);

    const handleGuess = (letter:string) => {
        const regexp = new RegExp(letter, "g");
		const selectedWordletterMatchesCount:number = (randomWord.match(regexp) || []).length;
		const correctLetterGuessCount = findLetter(letter).length;
		const hasWrongMatch = !!wrongGuesses?.filter(guess => guess.toLowerCase() === letter.toLowerCase()).length;

		if (hasWrongMatch || (selectedWordletterMatchesCount && correctLetterGuessCount >= selectedWordletterMatchesCount)) {
			setAlreadyGuessed(true);
		} else {
			if (selectedWordletterMatchesCount) {
				updateCorrectLetter(letter);
			} else {
                setGuessLimit((state) => state - 1);
				setWrongGuesses([...wrongGuesses, letter]);
			}
            
			setAlreadyGuessed(false);
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
        setAlreadyGuessed(false);
    }

    const checkIfWinnerOrLoser = () => {
        if (!guessLimit) {
            setMessage(FAIL_MESSAGE);
            setIsGameOver(true);
            return;
        }

        const isWinner = !!guessLimit && !splitWordLetters.filter(wordLetter => !wordLetter.isUsed).length;
		if (isWinner && splitWordLetters?.length) {
            setMessage(SUCCESS_MESSAGE);
            setIsGameOver(true);
        }
    }

    const onNewGame = () => {
        resetState();
        setMessage(NEW_GAME_MESSAGE);
        fetchRandomWord();
    }

    const resetState = () => {
        setIsLoading(true);
        setIsGameOver(false);
        setWrongGuesses([]);
        setAlreadyGuessed(false);
        setGuessLimit(DEFAULT_LIMIT);
        setSplitWordletters([]);
        
    }

    const fetchRandomWord = useCallback(async () => {
        resetState();

        const Service = GameService();
        let word:string = await Service.getRandomWord();
        setIsLoading(false);

        if (word?.length) {
            word = word[0];
            console.log(word);
            setRandomWord(word);
            setGuessLimit(word.length + 2); // add 2 to the length of the word for extra guesses
            mapLetters(word);
        }
    }, []);

    const mapLetters = (word:string) => {
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
                    <GuessLimit onRefresh={onHandleNewGame} guessLimit={guessLimit} />
                    <WrongGuesses letters={wrongGuesses} />
                    {alreadyGuessed && <AlreadyGuessed />}
                    <Guess onGuess={handleGuess} />
                </>
                }
                
            </>
            }
        </div>
    );
}

export default Game;
