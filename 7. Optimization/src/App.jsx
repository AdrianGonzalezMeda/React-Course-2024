import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';

function App() {
    log('<App /> rendered');

    const [chosenCount, setChosenCount] = useState(0);
    const handleSetCount = (newCount) => {
        setChosenCount(newCount);
    }

    // Otro ejemplo de usar key para la reejecucion de componentes, de esta forma podemos volver a resetear el initialCount
    return (
        <>
            <Header />
            <main>
                <ConfigureCounter onSet={handleSetCount} />
                <Counter key={chosenCount} initialCount={chosenCount} />
            </main>
        </>
    );
}

export default App;
