import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import GameLogic from './Cells/GameLogic'
import Display from './display/Display'
import StartButton from './startGame/StartButton'
import css from './tetris.module.css'
import { 
  generateRandomElement,
  setNewBoardAC, 
  setRAndomElemAC, 
  setElemVariantAC, 
} from '../redux/actions/tetrisMainActins'
import { TETRA_ELEMENTS } from './../constants'
import { setHorAC } from './../redux/actions/tetrisMainActins';

export function TetrisContainer(props) {
  const [startGame, setStartGame] = useState(false)
  const [vertical, setVertical] = useState(0)
  let timerRef = useRef()
  function checkWay (){
    if((TETRA_ELEMENTS[props.randomElementNum][props.elemVariant].length+vertical) === props.board.length ){
      setVertical(0)
    }
  }
  useEffect(()=>{
    if(props.randomElementNum!==null){
      checkWay()
      
    }
  }, [vertical])
  useEffect(() => {
    if(props.randomElementNum!==null){
      props.setNewBoardAC(dropNewChunk(props.horizontal, vertical-1, true))
      props.setNewBoardAC(dropNewChunk(props.horizontal, vertical, false))
    }
  }, [props.horizontal, vertical])
  useEffect(() => {
    if(props.randomElementNum !== null){
      props.setNewBoardAC(dropNewChunk(props.horizontal, vertical, false))
    }
  }, [props.elemVariant])
  useEffect(() => {
    if(startGame){
      timerRef.current = setInterval(() => {
          setVertical(prevCount => prevCount + 1);
          console.log(vertical)
        }, 1500)
    }else{
      clearInterval(timerRef.current)
      console.log(timerRef.current)
    }
  }, [startGame])

  useEffect(() => {
    window.addEventListener('keydown',handleUserKeyPress)
    return () =>window.removeEventListener('keydown', handleUserKeyPress)
  })
  useEffect(() => {
    props.setRAndomElemAC(generateRandomElement())
  }, [])
 
  function dropNewChunk(hor, vert, status) {
    let elemHeight = TETRA_ELEMENTS[props.randomElementNum][props.elemVariant].length -1
    let elemWidth = TETRA_ELEMENTS[props.randomElementNum][props.elemVariant][0].length-1
    let newBoard = [
      [...props.board[0]],
      [...props.board[1]],
      [...props.board[2]],
      [...props.board[3]],
      [...props.board[4]],
      [...props.board[5]],
      [...props.board[6]],
      [...props.board[7]],
      [...props.board[8]],
      [...props.board[9]],
      [...props.board[10]],
      [...props.board[11]],
    ]
    if(status){
      removeElem(newBoard, hor, vert, elemHeight, elemWidth)
    }else{
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
    for (let k = 0; k <= props.board.length - 1; k++) {
      let countElemW = 0
      let elemW = hor
      for (let c = 0; c <= props.board[k].length - 1; c++) {
        if(elemH === k){
          if (elemW === c){
              console.log(TETRA_ELEMENTS[props.randomElementNum][props.elemVariant][counterElemH][countElemW],'if statement')
              if(TETRA_ELEMENTS[props.randomElementNum][props.elemVariant][counterElemH][countElemW] === 1){
                newBoard[k][c] = 0
              }
            if(countElemW<prevElemWidth){
              console.log(elemW, 'elemWidth')
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

  const handleUserKeyPress = event => {
    const { key, keyCode } = event
    console.log(key, keyCode)
    if(props.randomElementNum!==null){
      let hor = props.horizontal
      let maxHor = props.board[0].length
      let elemWidth = TETRA_ELEMENTS[props.randomElementNum][props.elemVariant][0].length
      let v = props.elemVariant
      if (keyCode === 90 ||keyCode === 38) {
        let allVariants = TETRA_ELEMENTS[props.randomElementNum].length-1
        if(allVariants>props.elemVariant){
          props.setNewBoardAC(dropNewChunk(props.horizontal, vertical, true, false))
          v++
          props.setElemVariantAC(v)
        }else if(allVariants === props.elemVariant){
          props.setNewBoardAC(dropNewChunk(props.horizontal, vertical, true, false))
          props.setElemVariantAC(0)
        } 
      }else if(keyCode === 37){
        if((hor-1)>=0){
          props.setNewBoardAC(dropNewChunk(props.horizontal, vertical, true, false))
          props.setHorAC(hor-1)
        }
      }else if(keyCode === 39){
        if((hor+elemWidth+1)<=maxHor){
          props.setNewBoardAC(dropNewChunk(props.horizontal, vertical, true, false))
          props.setHorAC(hor+1)
        }
      }
    }
  }
  return (
    <div style={{display: 'flex'}} >
      <h1>{props.app}</h1>
      <GameLogic
        prevElemVariant = {props.prevElemVariant}
        elemVariant = {props.elemVariant}
        randomElementNum ={props.randomElementNum}
        startGame = {startGame}
        setStartGame = {setStartGame}
        setNewBoard = {props.setNewBoardAC}
        board = {props.board}
        setRAndomElem = {props.setRAndomElemAC}
      />
      <div className={css.container}>
        <Display text = "score" />
        <Display text = "max score"/>
        <StartButton 
          startGame = {startGame} 
          setStartGame = {setStartGame} 
          vertical = {vertical} 
          setVertical = {setVertical} 
        />
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    board: state.tetris.board,
    randomElementNum: state.tetris.randomElementNum,
    elemVariant: state.tetris.elemVariant,
    horizontal: state.tetris.horizontal,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    setNewBoardAC(board){
      dispatch(setNewBoardAC(board))
    },
    setRAndomElemAC(randomNum){
      dispatch(setRAndomElemAC(randomNum))
    },
    setElemVariantAC(variant){
      dispatch(setElemVariantAC(variant))
    },
    setHorAC(hor){
      dispatch(setHorAC(hor))
    },
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(TetrisContainer)