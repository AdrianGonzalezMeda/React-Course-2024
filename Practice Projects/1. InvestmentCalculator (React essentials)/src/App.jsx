/** Practice Project
Add components for displaying a HEADER,, fetching USER INPUT and outputting the RESULTS TABLE
Fetch and store user input (i.e, the enteres investment parameters)
Derive investment results with help of the provided utility function 
Display investement results in a Html table (use <table>,<thead><tbody><tr><th><td>
Conditionally display an info message if an invalid duration (<1) was entered
 */

import { useState } from "react"
import Header from "./components/Header"
import Results from "./components/Results"
import UserInput from "./components/UserInput";

function App() {
    const [userInput, setUserInput] = useState({
        initialInvestment: 1000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10
    });

    const inputIsValid = userInput.duration > 0;

    const onChangeHandler = (identifier, newVal) => {
        setUserInput(prevUserInput => {
            return {...prevUserInput, [identifier]: +newVal} // '+' cast string to number
        });
    }

    return (
        <>
            <Header />
            <UserInput userInput={userInput} onChangeHandler={onChangeHandler} />
            {!inputIsValid && <p className="center">Please enter a duration greater than 0</p>}
            {inputIsValid && <Results userInput={userInput} />}
        </>
    )
}

export default App
