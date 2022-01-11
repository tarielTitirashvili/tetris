import { 
  NEW_BOARD,
  RANDOM_ELEM,
  CHANGE_ELEM_VARIANT,
  SET_HORIZONTAL_POSITION,
} from "../constants"

export const setNewBoardAC = (board) => ({type: NEW_BOARD, board})
export const setRAndomElemAC = (randomNum)=>({type: RANDOM_ELEM, randomNum})
export const setElemVariantAC = (variant)=>({type: CHANGE_ELEM_VARIANT, variant})
export const setHorAC = (hor) =>({type: SET_HORIZONTAL_POSITION, hor})

export const generateRandomElement = ()=>{
  const randomTetrisElement = Math.floor(Math.random()*7)
  return randomTetrisElement
}