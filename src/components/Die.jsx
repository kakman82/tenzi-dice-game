const Die = ({ die, holdDice }) => {
  return (
    <div
      className='die-item'
      style={{ backgroundColor: die.isHeld ? '#59E391' : 'white' }}
      onClick={holdDice}>
      <h2 className='die-num'>{die.value}</h2>
    </div>
  );
};

export default Die;
