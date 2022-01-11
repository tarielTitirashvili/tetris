import { 
  NEW_BOARD,
  RANDOM_ELEM,
  CHANGE_ELEM_VARIANT,
  SET_HORIZONTAL_POSITION,
} from './../constants';
const initState = {
  board: [
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
    [0,0,0,0,0,0,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,1,1,1]
  ],
  randomElementNum: null,
  elemVariant: 0,
  prevElemVariant: null,
  horizontal: 5,
}
export default function tetrisMainReducer(state = initState, action) {
  switch (action.type) {
    case NEW_BOARD:
      return{
        ...state,
        board: action.board,
      }
    case RANDOM_ELEM:
      return{
        ...state,
        randomElementNum: action.randomNum,
      }
    case CHANGE_ELEM_VARIANT:
      return{
        ...state,
        elemVariant: action.variant,
      }
    case SET_HORIZONTAL_POSITION:
      return{
        ...state,
        horizontal: action.hor
      }
    default:
      return state
  }
}
