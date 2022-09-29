import React from "react";
import { SplitWordLettersListProps } from "../@types";
import SplitWordLetter from "./splitWordLetter";

const RandomWord: React.FC<SplitWordLettersListProps> = ({letters}) => {
    
    return (
        <div className="word-in-progress">
            {letters.map((letterProps) => <SplitWordLetter key={`${letterProps.letter}-${letterProps.index}`} {...letterProps}  />)}
        </div>
    );
}

export default RandomWord;
