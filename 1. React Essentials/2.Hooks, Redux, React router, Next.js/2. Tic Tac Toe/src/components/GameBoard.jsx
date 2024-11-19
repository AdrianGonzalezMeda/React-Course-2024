export default function GameBoard({ onSelectSquare, board }) {
    /* Esta es la funcionalidad anterior a la necesidad de necesitar la informacion de los juegos en otro componente
    Hacemos lo que se conoce como Lifting State Up, que es darle el manejo de esa informacion al componente 
    inmediatamente superior y pasarla como propiedad a los componentes que la necesiten
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            // Best Practice Avoid Mutability: siempre que trabajemos con objetos o arrays debemos hacer los cambios
            // sobre copias de los mismos, esto nos evitara problemas de mutacion de estados sobre una misma variable 
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])]; // Esto es para copiar un array multidimensional
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedBoard;
        });

        onSelectSquare();
    }*/

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}