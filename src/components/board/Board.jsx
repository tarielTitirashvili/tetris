import React from 'react'
import css from './cells.module.css'

export default function Board(props) {
  function calcWidth(num) {
    return `${100/num}%`
  }
  function calcHeight(num) {
    return `${600 / num}px-2px`
  }
  return (
    <div className={css.container}>
      {props.board.map((cells, index) => {
        return (
          <div className={css.wrapper} key={index}>
            {cells.map((cell, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: cell ? 'rgb(225, 0, 255)' : 'yellow',
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
  )
}
