import React, { useState } from 'react';
import Logo from './components/logo';
import './scss/main.scss';
import NewUser from './components/newUser';
import Game from './containers/game';

export default function App() {
  const [userName, setUserName] = useState('');

  const onReadyGame = (name:string) => {
    if (name) {
      setUserName(name);
    }
    
  }
  
  return (
    <>
      <Logo />
      {userName && <Game userName={userName} />}
      {!userName && <NewUser onReadyGame={onReadyGame} />}
    </>
  );
}