import React from 'react'
import css from './display.module.css'

export default function Display({text}) {
  return (
    <>
      <span className={css.display}>{text}</span>
    </>
  )
}
