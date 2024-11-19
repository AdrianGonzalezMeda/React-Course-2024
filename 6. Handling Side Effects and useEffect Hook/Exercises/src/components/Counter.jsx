import React, { useState, useCallback } from 'react';
/*
Descripción: Crea un componente de contador con dos botones: uno para incrementar y otro para resetear el contador.
Objetivo: Usa useCallback para memorizar la función de incremento, de modo que solo se actualice cuando el contador cambie. Usa console.log para confirmar que la función no se recalcula innecesariamente.
 */
function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const reset = () => setCount(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
