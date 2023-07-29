import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [clockCount, setClockCount] = useState(25 * 60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [breakCounter, setBreakCounter] = useState('5');
  const [sessionCounter, setSessionCounter] = useState('25');
  const [currentTimer, setCurrentTimer] = useState('Session');
  const [isSessionFinished, setIsSessionFinished] = useState(false);

useEffect(() => {
  let intervalId;

  if (isPlaying) {
    intervalId = setInterval(() => {
      setClockCount((prevCount) => {
        const newCount = prevCount - 1;
        if (newCount < 1) {
          setIsPlaying(false);
          setIsSessionFinished(true);
          if (currentTimer === "Session") {
            setCurrentTimer("Break");
            setClockCount(breakCounter * 60);
          } else {
            setCurrentTimer("Session");
            setClockCount(sessionCounter * 60);
            setTimeout(() => {
              setIsPlaying(true);
            }, 1000);
          }
        }
        return newCount;
      });
    }, 1000);
  }

  if (isSessionFinished && currentTimer === "Break") {
    intervalId = setInterval(() => {
      setClockCount((prevCount) => {
        const newCount = prevCount - 1;
        if (newCount < 1) {
          setIsPlaying(false);
          setIsSessionFinished(false);
          setCurrentTimer("Session");
          setClockCount(sessionCounter * 60);
          setTimeout(() => {
            setIsPlaying(true);
          }, 1000);
        }
        return newCount;
      });
    }, 1000);
  }

  return () => clearInterval(intervalId);
}, [isPlaying, breakCounter, currentTimer, sessionCounter, isSessionFinished]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setClockCount(25 * 60);
    setBreakCounter('5');
    setSessionCounter('25');
    setCurrentTimer('Session');
  };

  const handleBreakIncrease = (event) => {
    const newIncreasedCounter = parseInt(event.currentTarget.dataset.value) + 1;
    if (!isSessionFinished) {
      setBreakCounter(newIncreasedCounter.toString());
    }
  };

  const handleSessionIncrease = (event) => {
    const newIncreasedCounter = parseInt(event.currentTarget.dataset.value) + 1;

    setSessionCounter(newIncreasedCounter.toString());
    setClockCount((prevCount) => prevCount + 60);
  };
  
  
  const handleBreakDecrease = (event) => {
    let newDecreaseCounter = parseInt(event.currentTarget.dataset.value) - 1;

    if (newDecreaseCounter < 1) {
      return (newDecreaseCounter = 1);
    }

    if (!isSessionFinished) {
      setBreakCounter(newDecreaseCounter.toString());   
    } else {
      const remainingSessionTime = clockCount / 60;
      console.log((remainingSessionTime));

      if (newDecreaseCounter > remainingSessionTime) {
        setBreakCounter(remainingSessionTime.toString());
      } else {
        setBreakCounter(newDecreaseCounter.toString());
      }
    }
  };
  
  const handleSessionDecrease = (event) => {
    let newDecreaseCounter = parseInt(event.currentTarget.dataset.value) - 1;

    if (newDecreaseCounter < 1) {
      return (newDecreaseCounter = 1);
    }

    setSessionCounter(newDecreaseCounter.toString());
    setClockCount((prevCount) => Math.max(prevCount - 60, 0));
  };
  
  const convertToTime = (count) => {
    const minutes = Math.floor(count / 60);
    let seconds = count % 60;

    seconds = seconds < 10 ? ('0' + seconds) : seconds;

    return `${minutes}:${seconds}`;
  };

  const convertedTime = convertToTime(clockCount);

  return (
    <div className="App">
      <div className="card">
        <div className="container">
          <div className="box">
            <div className="title">POMODORO CLOCK</div>
            <div className="card2">
              <div className="counterDiv">
                <div className="breakDiv">
                  <div id="break-label">Break Length</div>
                  <div className="breakController">
                    <div
                      className="breakIncrement"
                      onClick={handleBreakIncrease}
                      data-value={breakCounter}
                    >
                      +
                    </div>
                    <div id="break-length">{breakCounter}</div>
                    <div
                      className="breakDecrement"
                      onClick={handleBreakDecrease}
                      data-value={breakCounter}
                    >
                      -
                    </div>
                  </div>
                </div>
                <div className="sessionDiv">
                  <div id="session-label">Session Length</div>
                  <div className="sessionController">
                    <div
                      className="sessionIncrement"
                      onClick={handleSessionIncrease}
                      data-value={sessionCounter}
                    >
                      +
                    </div>
                    <div id="session-length">{sessionCounter}</div>
                    <div
                      className="sessionDecrement"
                      onClick={handleSessionDecrease}
                      data-value={sessionCounter}
                    >
                      -
                    </div>
                  </div>
                </div>
              </div>
              <div className="fullClock">
                <div className="clock">
                  <div id="timer-label">{currentTimer}</div>
                  <div id="time-left">{convertedTime}</div>
                </div>
                <div className="commands">
                  <button id="start_stop" onClick={handlePlayPause}>
                    {isPlaying ? "PAUSE" : "PLAY"}
                    <div className="star-1">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 2l2.76 8.39h8.81l-7.11 5.19 2.76 8.39L12 17.32l-7.42 5.25 2.76-8.39L1.43 10.39h8.81z" />
                      </svg>
                    </div>

                    <div className="star-2">
                      <svg
                        viewBox="0 0 784.11 815.53"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                      >
                        <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                      </svg>
                    </div>
                    <div className="star-3">
                      <svg
                        viewBox="0 0 784.11 815.53"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                      >
                        <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                      </svg>
                    </div>
                    <div className="star-4">
                      <svg
                        viewBox="0 0 784.11 815.53"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                      >
                        <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                      </svg>
                    </div>
                    <div className="star-5">
                      <svg
                        viewBox="0 0 784.11 815.53"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                      >
                        <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                      </svg>
                    </div>
                    <div className="star-6">
                      <svg
                        viewBox="0 0 784.11 815.53"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                      >
                        <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                      </svg>
                    </div>
                  </button>
                  <button id="reset" onClick={handleReset}>
                    RESET
                    <div className="star-1">
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 2l2.76 8.39h8.81l-7.11 5.19 2.76 8.39L12 17.32l-7.42 5.25 2.76-8.39L1.43 10.39h8.81z" />
                      </svg>
                    </div>
                    <div className="star-2">
                      <svg
                        viewBox="0 0 784.11 815.53"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                      >
                        <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                      </svg>
                    </div>
                    <div className="star-3">
                      <svg
                        viewBox="0 0 784.11 815.53"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                      >
                        <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                      </svg>
                    </div>
                    <div className="star-4">
                      <svg
                        viewBox="0 0 784.11 815.53"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                      >
                        <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                      </svg>
                    </div>
                    <div className="star-5">
                      <svg
                        viewBox="0 0 784.11 815.53"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                      >
                        <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                      </svg>
                    </div>
                    <div className="star-6">
                      <svg
                        viewBox="0 0 784.11 815.53"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="yellow"
                      >
                        <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;