import { useState, useRef } from "react"
import ResultModal from "./ResultModal.jsx";

const TimerChallenge = ({ title, targetTime }) => {
    let timer = useRef();
    let dialogModal = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < (targetTime * 1000);

    if (timeRemaining <= 0) {
        clearTimeout(timer.current);
        dialogModal.current.open();
    }

    const handleStart = () => {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    const handleReset = () => {
        setTimeRemaining(targetTime * 1000);
    }

    const handleStop = () => {
        clearTimeout(timer.current);
        dialogModal.current.open();
    }

    return (
        <>
            <ResultModal
                ref={dialogModal}
                targetTime={targetTime}
                remainingTime={timeRemaining}
                onReset={handleReset}
            />

            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}

export default TimerChallenge
