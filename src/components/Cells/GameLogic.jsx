import React, {useEffect} from 'react'
import Board from './Board'
import { TETRA_ELEMENTS } from '../../constants'

export default function GameLogic(props) {
 

  return (
    <>
      <Board board={props.board} />
    </>
  )
}
