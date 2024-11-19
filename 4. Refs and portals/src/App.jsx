import Player from './components/Player.jsx';
import TimerChallenge from './components/TimerChallenge.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title={"1 second"} targetTime={1} />
        <TimerChallenge title={"5 seconds"} targetTime={5} />
        <TimerChallenge title={"10 seconds"} targetTime={10} />
        <TimerChallenge title={"15 seconds"} targetTime={15} />
      </div>
    </>
  );
}

export default App;
