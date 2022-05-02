import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Die from './components/Die';

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld === true);
    const firstDieVal = dice[0].value;
    const allSameVal = dice.every((die) => die.value === firstDieVal);
    if (allHeld && allSameVal) {
      setTenzies(true);
      alert('You won!');
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    }
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  return (
    <main>
      <h2 className='title'>Tenzies</h2>
      <p className='desc'>
        Roll until all dice are the same. Click each die to freeze it as its
        current value between rolls.
      </p>
      <div className='dice-container'>
        {dice.map((die) => (
          <Die key={die.id} die={die} holdDice={() => holdDice(die.id)} />
        ))}
      </div>
      <button className='roll-button' onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}

export default App;
