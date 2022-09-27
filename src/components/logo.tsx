import React from 'react';
import { LogoProps } from '../@types';
import logo from '../assets/logo.png';

const Logo: React.FC<LogoProps> = (props) => {
    return (
        <>
            <img
                {...props}
                src={logo} 
                className="logo" 
                alt="Guess The Word" 
            />
        </>
    );
}

export default Logo;