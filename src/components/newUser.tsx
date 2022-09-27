import React, {useState } from "react";
import { NewUserProps } from "../@types";
import Button from "./button";


const NewUser: React.FC<NewUserProps> = ({onReadyGame}) => {
    const [userName, setUserName] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setUserName(name);
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (userName) {
            onReadyGame(userName);
        }
    }

    return (
        <div className="new-user container">
            <input type="text" value={userName} onChange={handleChange} className="new-user-name" placeholder="What is your name?" />
            <Button onClick={handleClick}>
                Let&apos;s Play
            </Button>
        </div>
    );
}

export default NewUser;