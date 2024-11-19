import { useState } from "react"
import Output from "./Output";

const Greeting = () => {
    const [changedText, setChangeText] = useState(false);

    const changeTextHandler = () => {
        setChangeText(true);
    }

    return (
        <div>
            <h2>Hello world!</h2>
            {!changedText && <Output>It's good to see you!</Output>}
            {changedText && <Output>Changed!</Output>}
            <button onClick={changeTextHandler}>Change text!</button>
        </div>
    )
}

export default Greeting
