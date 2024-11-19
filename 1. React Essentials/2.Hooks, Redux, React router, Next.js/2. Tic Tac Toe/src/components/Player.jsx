import { useState } from "react"

const Player = ({ name: initialName, symbol, isActive, onChangeName }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);
    const handleEditClick = () => {
        /* Good practice: En lugar de actualizar directamente nuestra variable de estado (isEditing)
        debemos usar una funcion para cambiar el estado. Esto es por la forma en la que funciona useState,
        al final useState se ejecuta asincronamente, por lo que si hicieramos dos llamadas consecutivas
        de setIsEditing(!isEditing) pensando en que la variable pasaria primero por true y despues por false,
        seria incorrecto, ya que ambas se ejecutarian con el primer valor que tenia isEditing, que es false,
        de forma que ambas evaluarian a true, que no es lo que esperariamos. Para asegurarnos de que estamos 
        editando exactamente el anterior estado de la variable, lo mejor es crear una funcion que reciba un
        parametro y retorne el valor deseado, ya que ese parametro recibira el valor anterior de la variable.
        Esto aplica cuando necesitamos saber el anterior valor de la variable, tambien aplicaria a cosas como
        setIsEditing(editing ? true : false), por que estamos evaluando el valor de la variable para despues 
        cambiarla*/
        setIsEditing((editing) => !editing);
        //setIsEditing(!isEditing); Esto tambien funcionaria, pero podriamos tener comportamientos no esperados
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }

    const handleChange = (event) => setPlayerName(event.target.value);

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {!isEditing && <span className="player-name">{playerName}</span>}
                {isEditing && <input
                    type="text"
                    className="player-name"
                    value={playerName}
                    onChange={handleChange} // two-way binding: manejar la misma variable en el value y en el onChange 
                    required />}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button
                onClick={handleEditClick}
            >
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </li>
    )
}

export default Player
