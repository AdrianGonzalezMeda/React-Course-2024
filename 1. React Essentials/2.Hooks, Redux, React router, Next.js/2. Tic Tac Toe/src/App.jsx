import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import GameOver from "./components/GameOver"
import { WINNING_COMBINATIONS } from "./winning-combinations.js"

const PLAYERS = { 'X': 'Player 1', 'O': 'Player 2' };
const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function getCurrentPlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }

    return currentPlayer;
}

function getWinner(gameBoard, players) {
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            return players[firstSquareSymbol];
        }
    }

    return null;
}

function getGameBoard(gameTurns) {
    /* Hay que recordar que los objetos y arrays son valores de referencia, por lo que los cambios que hagas en uno se mantienen en el objeto
    original, por lo que gameBoard e initialBoard al final tendran el mismo valor, y cuando nosotros reseteamos gameTurns (setGameTurns([]))
    y el componente se vuelve a renderizar, si tenemos let gameBoard = initialGameBoard, el estado de initialGameBoard ya ha mutado y vuelve 
    a igualarla a una matriz rellena con los turnos anteriores. Por eso al igualar arrays u objetos siempre hay que hacer copias*/
    let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]; // De esta forma copiamos un array multidimensional con spread operator

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function App() {
    const [players, setPlayers] = useState(PLAYERS);
    /* Lifting the state Up: Ocurre cuando necesitamos la misma propiedad en dos componentes distintos, por lo que como no 
    pueden comunicarse entre ellos, lo que se hace es pasar el manejo de la propiedad al componente inmediatamente superior
    y que sea éste el que comunique el valor a los dos componentes que lo necesitaban*/
    const [gameTurns, setGameTurns] = useState([]);
    /*const [activePlayer, setActivePlayer] = useState('X'); Una vez tenemos gameTurns no es necesario manejar
    el estado del jugador actual, ya que podemos sacarlo del historico de las jugadas, como hacemos en el setGameTurns*/
    const activePlayer = getCurrentPlayer(gameTurns);
    const gameBoard = getGameBoard(gameTurns);
    const winner = getWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    const handleSelectSquare = (rowIdx, colIdx) => {
        setGameTurns((prevGameTurns) => {
            let currentPlayer = getCurrentPlayer(prevGameTurns);

            const updatedGameTurns = [
                { square: { row: rowIdx, col: colIdx }, player: currentPlayer },
                ...prevGameTurns
            ];

            return updatedGameTurns;
        });
    }

    const handleRestart = () => {
        setGameTurns([]);
    }

    const handlePlayerNameChange = (symbol, newName) => {
        setPlayers((prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            }
        }));
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
                    <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
                <GameBoard
                    board={gameBoard}
                    onSelectSquare={handleSelectSquare}
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App
