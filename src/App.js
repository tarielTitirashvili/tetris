import { useState, useEffect, useRef } from 'react'
import css from './App.module.css'
import Tetris from './components/DrawElements'
import { TETRA_ELEMENTS } from './constants';
import Settings from './components/settings/Settings';

function App() {
  const [level, setLevel] = useState({timing: 1500, name: 'easy', key: 0})
  const [startGame, setStartGame] = useState(false)
  const [settings, setSettings] = useState(true)
  const [rows, setRows] = useState(12)
  const [column, setColumn] = useState(12)
  const [vertical, setVertical] = useState(0)
  function generateBoard(){
    let generatedBoard = []
    let boardLine = []
    if(22>=column && column>=12 && 12<=rows && rows<=22){
      for(let i=0; i<column; i++){
        for(let l=0; l<rows; l++){
          boardLine.push(0)
        }
        generatedBoard.push(boardLine)
        boardLine=[]
      }
    }
    return generatedBoard
  }
  const [board, setBoard] = useState([])
  const [randomElementNum, setRandomElem] =useState(null)
  const [elemVariant, setElemVariant] = useState(0)
  const [horizontal, setHorizontal] = useState(5)
  const [nextVariant, setNextVariant] = useState(0)
  const [lose, setLose] = useState(false)
  let timerRef = useRef()
  function setNextVariantFN(randomNum, elemVariant) {
    if(elemVariant>=(TETRA_ELEMENTS[randomNum].length-1))setNextVariant(0)
    else if(elemVariant < TETRA_ELEMENTS[randomNum].length)setNextVariant(elemVariant+1)
  }
  useEffect(() => {
    if(startGame && !lose && !settings){
      timerRef.current = setInterval(() => {
        setVertical(prevCount => {
          return prevCount + 1
        })
      }, level.timing)
    }else if(!startGame || lose || settings){
      clearInterval(timerRef.current)
    } 
  }, [startGame, lose, settings])
  useEffect(()=>{
    setBoard(generateBoard())
  },[column, rows, settings])
  useEffect(()=>{
    let startHorizontalPos = Math.floor(rows/2)-1 
    setHorizontal(startHorizontalPos)
  },[rows])
  useEffect(()=>{
    if(randomElementNum!==null)setNextVariantFN(randomElementNum, elemVariant)
  },[elemVariant, randomElementNum])
  console.log('render')
  return (
    <div className={css.app}>
      {
        settings?<div className= {css.settingsContainer}>
        <Settings
          level = {level}
          setLevel = {setLevel}
          rows = {rows}
          setRows = {setRows}
          column = {column}
          setColumn = {setColumn}
          setSettings = {setSettings}
        />
      </div>:<div>
      <Tetris
        startGame = {startGame}
        setStartGame = {setStartGame}
        generateBoard = {generateBoard}
        level = {level}
        rows = {rows}
        column = {column}
        vertical = {vertical}
        setVertical = {setVertical}
        setLose = {setLose}
        lose = {lose}
        board = {board} 
        setNewBoard = {setBoard} 
        randomElementNum = {randomElementNum} 
        setRAndomElem = {setRandomElem}
        elemVariant = {elemVariant}
        setElemVariant = {setElemVariant}
        horizontal = {horizontal}
        setHor = {setHorizontal}
        nextVariant = {nextVariant}
        settings = {settings}
        setSettings = {setSettings}
      />
      </div>
      }
    </div>
  )
}
export default App;



export const generateRandomElement = ()=>{
  const randomTetrisElement = Math.floor(Math.random()*7)
  return randomTetrisElement
}