import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers}/>
    }

    // la propiedad key nos sirve para lanzar "manualmente" la re evaluacion de un componente
    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                activeQuestionIndex={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}

export default Quiz
