import React, { useState, useEffect } from 'react';
import clockIcon from '../../assets/icons/clock-icon.png'; 

const Timer = ({ duration }) => {
  const [timeLeft, setTimeRemaining] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeRemaining((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div style={{ display: 'flex',alignItems: 'center', marginTop: '20px' }}>
      <img src={clockIcon} alt="Clock icon" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
      <p>Time Remaining: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
