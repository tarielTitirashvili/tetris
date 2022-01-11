import React from 'react'
import css from './startButton.module.css'

export default function StartButton(props) {

  const handleClick = () => {
    props.setStartGame(!props.startGame)
  }
  return (
    <div>
        <h1>{props.vertical}</h1>

      <button className={css.start_game} onClick={()=>handleClick()}>
          {props.startGame? 'pause' : 'START GAME' }
      </button>
    </div>
  )
}
