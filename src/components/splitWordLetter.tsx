import React from 'react';
import { SplitWordLetterProps } from '../@types';


const SplitWordLetter: React.FC<SplitWordLetterProps> = ({letter, isUsed}) => {
    return (
        <>
            <span className={`letter ${!isUsed ? 'invalid-guess' : ''}`}>
                <span className="letter-char">{isUsed ? letter : '&bull;'}</span>
            </span>
        </>
    )
}

export default SplitWordLetter;