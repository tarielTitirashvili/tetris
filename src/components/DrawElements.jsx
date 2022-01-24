import React, { useState, useEffect, useRef } from 'react'
import GameLogic from './board/MovingLogics'
import Display from './display/Display'
import StartButton from './startGame/StartButton'
import css from './drawElements.module.css'
import { generateRandomElement} from '../App'
import { TETRA_ELEMENTS } from '../constants'

export default function DrawElements(props) {
  const [startGame, setStartGame] = useState(false)
  function generateNewBoard() {
    let generatedBoard = []
    if(22>=props.column && props.column>=12 && 12<=props.rows && props.rows<=22){
      for(let i=0; i<props.column; i++){
        generatedBoard.push(props.board[i])
      }
    }
    return generatedBoard
  }
  let newBoard = generateNewBoard()
  let timerRef = useRef()
  useEffect(()=>{
    if(props.vertical===0){
      for(let k=0; k<props.board.length; k++){
        let counter = 0
        for(let p=0; p<props.board[k].length; p++){
          if(props.board[k][p]===1){
            counter++
          }
        }
        if(counter === props.board[k].length){
          let newLine = []
          for(let i=0; i<props.rows; i++){
            newLine.push(0)
          }
          props.setScore(prev=>prev+1)
          newBoard.splice(k,1)
          newBoard.unshift(newLine)
          props.setNewBoard(newBoard)
          props.setVertical(0)
        }
        counter = 0
      }
    }
    if(props.randomElementNum!==null){
      if(checkWay(props.horizontal, props.vertical, props.board, props.elemVariant, props.randomElementNum)){
        props.setNewBoard(dropNewChunk(props.horizontal, props.vertical, false, newBoard,'move'))
      }
    }
  }, [props.vertical])
  useEffect(() => {
    if(props.randomElementNum!==null){
        props.setNewBoard(dropNewChunk(props.horizontal, props.vertical, false, newBoard,'move'))
        if((props.vertical+TETRA_ELEMENTS[props.randomElementNum][props.elemVariant].length)===newBoard.length)props.setVertical(0)
    }
  }, [props.elemVariant])
  useEffect(() => {
    if(startGame && !props.lose){
      timerRef.current = setInterval(() => {
        props.setVertical(prevCount => prevCount + 1)
      }, props.level.timing)
    }else if(!startGame || props.lose){
      clearInterval(timerRef.current)
    } 
  }, [startGame, props.lose])
  useEffect(() => {
    props.setRAndomElem(generateRandomElement())
  }, [])
  function reset() {
    if(props.vertical === 0)props.setLose(true)
    props.setRAndomElem(generateRandomElement())
    props.setElemVariant(0)
    props.setHor(5)    
  }
  function checkWay (horizontal, vertical, board, elemVariant, randomElem){
    let elemHeight = TETRA_ELEMENTS[randomElem][elemVariant].length -1
    let elemWidth = TETRA_ELEMENTS[randomElem][elemVariant][0].length-1 
    let positions = []
    let hor = horizontal
    let maxH = 0
    if((TETRA_ELEMENTS[randomElem][elemVariant].length+vertical) >= props.board.length){
      props.setVertical(0)
      reset()
    }
    for (let w = 0; w<=elemWidth; w++) {
      for (let h = 0; h<=elemHeight; h++) {
        if(TETRA_ELEMENTS[randomElem][elemVariant][h][w]===1)maxH = h
      }
      positions.push(maxH)
      maxH=0
    }
    for(let check=hor; check<=(hor+elemWidth); check++){
      let test = board[vertical+positions[maxH]][check]
      maxH++
      if(test === 1){
        props.setVertical(0)
        reset(vertical)
        return false
      }
    }
    return true
  }
  function dropNewChunk(hor, vert, status, newBoard, direction) {
    let elemHeight = TETRA_ELEMENTS[props.randomElementNum][props.elemVariant].length -1
    let elemWidth = TETRA_ELEMENTS[props.randomElementNum][props.elemVariant][0].length-1
    if(status){
      removeElem(newBoard, hor, vert, elemHeight, elemWidth)
    }else{
      removeElem(newBoard, hor, vert-1, elemHeight, elemWidth)
    }
      if(direction === 'left'){
        addElem(newBoard, hor-1, vert, elemWidth, elemHeight)
      }else if(direction === 'right'){
        addElem(newBoard, hor+1, vert, elemWidth, elemHeight)
      }else if(direction ==='move'){
        addElem(newBoard, hor, vert, elemWidth, elemHeight)
      }
    return newBoard
  }
  function addElem(newBoard, hor, vert, elemWidth, elemHeight){
    let elemH = vert
    let counterElemH = 0
    for (let k = 0; k <= props.board.length - 1; k++) {
      let countElemW = 0
      let elemW = hor
      for (let c = 0; c <= props.board[k].length - 1; c++) {
        if(elemH === k){
          if (elemW === c){
            if(TETRA_ELEMENTS[props.randomElementNum][props.elemVariant][counterElemH][countElemW]===1){
              newBoard[k][c] = TETRA_ELEMENTS[props.randomElementNum][props.elemVariant][counterElemH][countElemW]
            }
            if(countElemW<elemWidth){
              elemW++
              countElemW++
            }
          }
        }
      }
      if(elemH === k && counterElemH < elemHeight){
        counterElemH++
        elemH++
      }
    }
  }
  function removeElem(newBoard, hor, vert, prevElemHeight, prevElemWidth){
    let elemH = vert
    let counterElemH = 0
    for (let k = 0; k <= props.board.length - 1; k++){
      let countElemW = 0
      let elemW = hor
      for (let c = 0; c <= props.board[k].length - 1; c++){
        if(elemH === k){
          if (elemW === c){
              if(TETRA_ELEMENTS[props.randomElementNum][props.elemVariant][counterElemH][countElemW] === 1)newBoard[k][c] = 0
            if(countElemW<prevElemWidth){
              elemW++
              countElemW++
            }
          }
        }
      }
      if(elemH === k && counterElemH < prevElemHeight){
        counterElemH++
        elemH++
      }
    }
  }
  return (
    <div className={css.tetris_wrapper}>
      <div className={css.container}>
        <Display score = {props.score} text = "score" />
        <StartButton
          generateBoard = {props.generateBoard}
          setScore = {props.setScore}
          setLose = {props.setLose}
          setBoard = {props.setNewBoard}
          lose = {props.lose}
          startGame = {startGame}
          setStartGame = {setStartGame}
        />
          <button className={css.changeSettings} onClick={()=>props.setSettings(true)}>
            change Settings
          </button>
      </div>
      <GameLogic
        setHor = {props.setHor}
        horizontal = {props.horizontal}
        nextVariant = {props.nextVariant}
        setVertical = {props.setVertical}
        vertical = {props.vertical}
        randomElementNum = {props.randomElementNum}
        dropNewChunk = {dropNewChunk}
        newBoard = {newBoard}
        setElemVariant = {props.setElemVariant}
        elemVariant = {props.elemVariant}
        setNewBoard = {props.setNewBoard}
        board = {props.board}
      />
    </div>
  )
}