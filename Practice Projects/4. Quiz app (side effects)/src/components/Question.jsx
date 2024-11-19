import { useState } from "react"
import Answers from "./Answers.jsx"
import QuestionTimer from "./QuestionTimer.jsx"
import QUESTIONS from '../questions.js';
const TIMER = 10000;

const Question = ({ activeQuestionIndex, onSelectAnswer, onSkipAnswer }) => {
    const [answer, setAnswer] = useState({ selectedAnswer: '', isCorrect: null });

    // Con esto reseteamos los valores del timeout para que cambien junto con los timeouts que tenemos al seleccionar la respuesta
    let timer = TIMER;
    if (answer.selectedAnswer) {
        timer = 1000;
    }
    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    const handleSelectAnswer = (answer) => {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });
        // Estos timeouts son puramente por darle estilos a las preguntas en funcion de si estan bien o mal y 
        // para darle fluidez a la transicion entre preguntas
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[activeQuestionIndex].answers[0] === answer
            });

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState = '';
    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }

    return (
        <div>
            <div id="question">
                <QuestionTimer
                    key={timer}
                    timeout={timer}
                    onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
                    mode={answerState}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>

                <Answers
                    answers={QUESTIONS[activeQuestionIndex].answers}
                    selectedAnswer={answer.selectedAnswer}
                    answerState={answerState}
                    onSelect={handleSelectAnswer}
                />
            </div>
        </div>
    )
}

export default Question
