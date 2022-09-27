import { ButtonHTMLAttributes, ImgHTMLAttributes } from "react";

export interface LogoProps extends ImgHTMLAttributes<HTMLImageElement> {}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface NewUserProps {
    onReadyGame: (name:string) => void
}

export interface SplitWordLettersListProps {
    letters: SplitWordLetterProps[]
}

export interface SplitWordLetterProps {
    letter: string;
    index: number;
    isUsed: boolean;
}

export interface GuessProps {
    onGuess: (letter:string) => void,
}