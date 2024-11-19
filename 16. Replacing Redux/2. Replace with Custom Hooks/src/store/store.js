import { useEffect, useState } from 'react';
// Al definirla fuera del custom hook esta variable no se recreara al llamar al hook, y sera la misma para todos
// aquellos que la usen. Si las declarasemos dentro del hook, cada componente tendria sus propias variables y no
// serian compartidas
let globalState = {}; 
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
    const setState = useState(globalState)[1]; // solo queremos la funcion

    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload);
        globalState = {...globalState, ...newState};

        for (const listener of listeners) {
            listener(globalState);
        }
    }

    // Añadimos un listener solo cuando el componente se crea, no en sus reevaluaciones. 
    useEffect(() => {
        if (shouldListen) {
            listeners.push(setState);
        }

        // Quitamos el listener cuando el componente se desmonte
        return () => {
            if (shouldListen) {
                listeners = listeners.filter(lis => lis !== setState);
            }
        }
    }, [setState, shouldListen]);

    return [globalState, dispatch];
}

// Podriamos crear cuantas store quisieramos de forma similar a las slice de Redux
export const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = {...globalState, ...initialState};
    }

    actions = {...actions, ...userActions};
}