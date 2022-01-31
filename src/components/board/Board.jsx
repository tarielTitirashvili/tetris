import React from 'react'
import css from './board.module.css'

export default function Board(props) {
  function generateColor(value) {
    if(value === 'H') return 'red'
    if(value === 'I') return 'green'
    if(value === 'Z') return 'rgba(255, 0, 191)'
    if(value === 'S') return 'blue'
    if(value === 'P') return 'rgba(0, 247, 255)'
    if(value === 'L') return 'rgba(255, 166, 0)'
    if(value === 'T') return 'rgba(255, 0, 55)'
    if(value === 0 )return 'black'
  }
  function calcWidth(num) {
    return `${100/num}%`
  }
  function calcHeight(num) {
    return `${600 / num}px-2px`
  }
  return (
    <div className={css.board_container}>
      <div className={css.container}>
        {props.board.map((cells, index) => {
          return (
            <div className={css.wrapper} key={index}>
              {cells.map((cell, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: generateColor(cell),
                      width: calcWidth(cells.length),
                      height: calcHeight(cells.length),
                      display: 'block',
                      border: 'solid black 0.3px'
                    }}
                  >
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>

  )
}
