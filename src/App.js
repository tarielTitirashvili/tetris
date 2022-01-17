import { useState, useEffect } from 'react'
import css from './App.module.css'
import Tetris from './components/DrawElements'
import { TETRA_ELEMENTS } from './constants';

function App() {
  const [board, setBoard] = useState([
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0]
  ])
  const [randomElementNum, setRandomElem] =useState(null)
  const [elemVariant, setElemVariant] = useState(0)
  const [horizontal, setHorizontal] = useState(5)
  const [score, setScore] = useState(0)
  const [nextVariant, setNextVariant] = useState(0)
  const [lose, setLose] = useState(false)
  function setNextVariantFN(randomNum, elemVariant) {
    if(elemVariant>=(TETRA_ELEMENTS[randomNum].length-1)){
      setNextVariant(0)
    }else if(elemVariant < TETRA_ELEMENTS[randomNum].length){
      setNextVariant(elemVariant+1)
    }
  }
  useEffect(()=>{
    if(randomElementNum!==null){
      setNextVariantFN(randomElementNum, elemVariant)
    }
  },[elemVariant, randomElementNum])
  console.log(lose)
  return (
    <div className={css.app}>
      <Tetris
        setLose = {setLose}
        lose = {lose}
        score = {score}
        setScore = {setScore} 
        board = {board} 
        setNewBoard = {setBoard} 
        randomElementNum = {randomElementNum} 
        setRAndomElem = {setRandomElem}
        elemVariant = {elemVariant}
        setElemVariant = {setElemVariant}
        horizontal = {horizontal}
        setHor = {setHorizontal}
        nextVariant = {nextVariant}
      />
    </div>
  )
}
export default App;



export const generateRandomElement = ()=>{
  const randomTetrisElement = Math.floor(Math.random()*7)
  return randomTetrisElement
}