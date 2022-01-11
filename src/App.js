import css from './App.module.css'
import Tetris from './components/TetrisContainer'

function App() {
  console.log('render APP')
  return (
    <div className={css.app}>
      <Tetris />
    </div>
  )
}

export default App;
