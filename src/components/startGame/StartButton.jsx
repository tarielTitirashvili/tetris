import React from 'react'
import css from './startButton.module.css'

export default function StartButton(props) {

  const handleClick = () => {
    props.setStartGame(!props.startGame)
    if(props.lose){
      props.setBoard([
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
        props.setLose(false)
    }
  }
  return (
    <div>
      <button className={css.start_game} onClick={()=>handleClick()}>
          {props.startGame? props.lose?'RESTART' : 'PAUSE' : 'START' }
      </button>
    </div>
  )
}
