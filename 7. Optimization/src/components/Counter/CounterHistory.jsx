import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
    log('<HistoryItem /> rendered', 3);

    const [selected, setSelected] = useState(false);

    function handleClick() {
        setSelected((prevSelected) => !prevSelected);
    }

    return (
        <li onClick={handleClick} className={selected ? 'selected' : undefined}>
            {count}
        </li>
    );
}

export default function CounterHistory({ history }) {
    log('<CounterHistory /> rendered', 2);

    // React vincula el estado a los componentes y a su posicion, por lo que si en la propiedad key usamos siempre 
    // el index, este siempre sera el mismo aun que vayan entrando nuevos items a 'count', lo que hara que el estado
    // selected no se aplique siempre al mismo elemento, por que su posicion cambio. Para solucionarlo, lo mejor es 
    // usar keys que esten vinculadas de algun modo al estado
    return (
        <ol>
            {history.map((count, index) => (
                <HistoryItem key={count.id} count={count.value} />
            ))}
        </ol>
    );
}
