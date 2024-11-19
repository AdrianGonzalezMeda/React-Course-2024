import { useState, useEffect } from "react";

const QuestionTimer = ({ timeout, onTimeout, mode }) => {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timmer = setTimeout(onTimeout, timeout);

        return () => {
            clearTimeout(timmer);
        }
    }, [onTimeout, timeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100)
        }, 100);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <progress id="question-time" value={remainingTime} max={timeout} className={mode} />
    )
}

export default QuestionTimer
