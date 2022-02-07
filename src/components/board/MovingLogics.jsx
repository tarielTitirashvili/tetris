import React, {useEffect} from 'react'
import Board from './Board'
import { DOWN_MOBILE_BUTTON, RIGHT_MOBILE_BUTTON, TETRA_ELEMENTS, UP_MOBILE_BUTTON } from '../../constants'
import MobileButtons from './buttons/MobileButtons';
import { LEFT_MOBILE_BUTTON } from './../../constants';

export default function MovingLogics(props) {
  useEffect(() => {
    window.addEventListener('keydown',handleUserKeyPress)
    return () =>window.removeEventListener('keydown', handleUserKeyPress)
  })
  const handleUserKeyPress = (event, button) => {
    const { keyCode } = event
    if(props.randomElementNum!==null){
      let hor = props.horizontal
      let maxHor = props.board[0].length
      let elemWidth = TETRA_ELEMENTS[props.randomElementNum][props.elemVariant][0].length
      let v = props.elemVariant
      if (keyCode === 90 || keyCode === 38 || button === UP_MOBILE_BUTTON) {
        let allVariants = TETRA_ELEMENTS[props.randomElementNum].length-1
        if(TETRA_ELEMENTS[props.randomElementNum].length!==1){
          if(allVariants>props.elemVariant){
            if(checkNewVariant(props.randomElementNum, props.elemVariant, props.newBoard, props.vertical, props.horizontal, props.nextVariant)){
                props.setNewBoard(props.dropNewChunk(props.horizontal, props.vertical, true, props.newBoard))
                v++
                props.setElemVariant(v)
            }
          }else if(allVariants === props.elemVariant){
              if(checkNewVariant(props.randomElementNum, props.elemVariant, props.newBoard, props.vertical, props.horizontal, props.nextVariant)){
                props.setNewBoard(props.dropNewChunk(props.horizontal, props.vertical, true, props.newBoard))
                props.setElemVariant(0)
              }
          }
        }
      }else if(keyCode === 37 || button ===LEFT_MOBILE_BUTTON ){
        if((hor-1)>=0){
          if(checkWayHorizontal(keyCode, props.horizontal, props.vertical, props.elemVariant, props.randomElementNum, props.board)){
            props.setNewBoard(props.dropNewChunk(props.horizontal, props.vertical, true, props.newBoard,'left'))
            props.setHor(hor-1)
          }
        }
      }else if(keyCode === 39 || button === RIGHT_MOBILE_BUTTON){
        if((hor+elemWidth+1)<=maxHor){
          if(checkWayHorizontal(keyCode, props.horizontal, props.vertical, props.elemVariant, props.randomElementNum, props.board)){
            props.setNewBoard(props.dropNewChunk(props.horizontal, props.vertical, true, props.newBoard, 'right'))
            props.setHor(hor+1)
          }
        }
      }else if(keyCode === 40 || button === DOWN_MOBILE_BUTTON)props.setVertical(prev=>prev+1)
    }
  }
  function checkWayHorizontal(keyCode, horizontal, vertical, elemVariant, randomElem, board) {
    let elemHeight = TETRA_ELEMENTS[randomElem][elemVariant].length -1
    let elemWidth = TETRA_ELEMENTS[randomElem][elemVariant][0].length-1 
    let positions = []
    let hor = horizontal
    let maxH = 0
    for (let h = 0; h<=elemHeight; h++){
      for (let w = 0; w<=elemWidth; w++){
        let test = TETRA_ELEMENTS[randomElem][elemVariant][h][w]
        if(test !==0)if(keyCode === 39){
          maxH = w
        }else if(keyCode === 37){
          maxH = w
          w=elemWidth
        }
      }
      positions.push(maxH)
      maxH=0
    }
    if(keyCode===39)for(let h=vertical; h<(vertical+elemHeight+1);h++){
      let tester = board[h][hor+positions[maxH]+1]
      if(tester !== 0 )return false
      maxH++
    }
    if(keyCode===37)for(let h=vertical; h<(vertical+elemHeight+1);h++){
      let tester = board[h][hor+positions[maxH]-1]
      if(tester !== 0 )return false
      maxH++
    }
    return true
  }
  function checkNewVariant(randomNum, elemVariant, newBoard, vertical, hor, nextVariant) {
    let paintedElem = [] 
    let horizontalPos = TETRA_ELEMENTS[randomNum][nextVariant][0].length
    let hight = TETRA_ELEMENTS[randomNum][nextVariant].length
    if((hight+vertical)>newBoard.length)return false
    if((horizontalPos+hor)>newBoard[0].length)return false
    for(let b=0; b<TETRA_ELEMENTS[randomNum][elemVariant].length; b++){
      for(let l=0; l<TETRA_ELEMENTS[randomNum][elemVariant][0].length; l++){
        if(TETRA_ELEMENTS[randomNum][elemVariant][b][l] !== 0)paintedElem.push([b,l])
      }
    }
    for(let h=0; h<TETRA_ELEMENTS[randomNum][nextVariant].length; h++){
      for(let w=0; w<TETRA_ELEMENTS[randomNum][nextVariant][h].length; w++){
        if(TETRA_ELEMENTS[randomNum][nextVariant][h][w]!==0){
          if(newBoard[vertical+h][hor+w]!==0){
            let test = false
            for(let i=0; i<paintedElem.length; i++){
              if(paintedElem[i][0]===h && paintedElem[i][1]===w)test = true
            }
            if(!test)return false
          }
        }
      }
    }
    return true
  }
  return (
    <>
      <Board board={props.board} />
      <div style={{display: 'flex', justifyContent: 'center',paddingTop:'30px'}}>
        <MobileButtons handleUserKeyPress = {handleUserKeyPress} />
      </div>
    </>
  )
}
