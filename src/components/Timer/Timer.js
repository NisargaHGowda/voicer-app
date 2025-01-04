import React, { useState, useEffect } from 'react';
import './Timer.css';
import clockIcon from '../../assets/icons/clock-icon.png';

const Timer = ({ duration = 300 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerInterval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="timer-container">
      <img src={clockIcon} alt="Clock Icon" className="timer-icon" />
      <p>Time remaining: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
