import { useState, useRef } from "react";

export default function Player() {
    // La principal diferencia entre referencias y estados es que el cambio de valor de una referencia no hace que
    // el componente vuelva a renderizarse como sí lo hace al actualizar el valor de un estado
    const [enteredPlayerName, setEnteredPlayerName] = useState(null);
    const playerInput = useRef();

    const handleClick = () => {
        /*El uso de referencias nos da acceso a un objeto cuya unica propiedad siempre sera current y contiene
        el nodo nativo con todas sus propiedades, metodos etc*/
        setEnteredPlayerName(playerInput.current.value);
        /*El uso de referencias para manipular el dom viola la idea de react de no escribir codigo imperativo
        por lo que hay que tener cuidado en que momentos y de que forma usamos las referencias, ya que no 
        deberiamos usarlas para manipular estados o nodos del dom, en este caso unicamente estamos leyendo
        el valor de un nodo y despues seteandolo a '', pero al menos no esta atado a ningun estado*/
        playerInput.current.value = ''; // El valor de playerInput.current se obtiene en el segundo ciclo de render,
        // en el primer ciclo se crea la referencia entre el nodo y la referencia
    }

    return (
        <section id="player">
            <h2>Welcome { enteredPlayerName ?? 'unknown entity' }</h2>
            <p>
                <input ref={playerInput} type="text" />
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    );
}

/* De este modo no podemos conseguir la funcionalidad deseada, ya que el h2 estaria continuamente cambiando entre
el nombre dado y 'unknown entity' por la forma en la que actualizamos los estados. Arriba lo solucionamos con el 
uso de referencias*/
/*export default function Player() {
    const [enteredPlayerName, setEnteredPlayerName] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const onChangeHandler = (event) => {
        setSubmitted(false)
        setEnteredPlayerName(event.target.value);
    }

    return (
        <section id="player">
            <h2>Welcome {submitted ? enteredPlayerName : 'unknown entity' }</h2>
            <p>
                <input type="text" onChange={onChangeHandler} />
                <button onClick={() => setSubmitted(true)}>Set Name</button>
            </p>
        </section>
    );
}*/
