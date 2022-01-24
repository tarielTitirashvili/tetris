import React from 'react'
import { LEVELS } from '../../constants'
import css from './Settings.module.css'

export default function settings(props) {
  function onSortLevelSelect(e){
    if(e.target.value === "level")props.setLevel(undefined)
    props.setLevel(LEVELS[e.target.value])
  }
  function removeRow() {
    if(props.rows>12)props.setRows(prev=>prev-1)
  }
  function addRow() {
    if(props.rows<22)props.setRows(prev=>prev+1)
  }
  function removeColumn(){
    if(props.column>12)props.setColumn(prev=>prev-1)
  }
  function addColumn() {
    if(props.column<22)props.setColumn(prev=>prev+1)
  }
  function onGoToGame() {
    if(props.level !== undefined)props.setSettings(false)
  }

  return <div>
    <div className={css.settingsCard}>
      <div className={css.settingContainer}>
        ROWS: 
        <button className={css.selectorButtons} onClick={removeRow}> - </button> 
          {props.rows}
        <button className={css.selectorButtons} onClick={addRow}> + </button>
        </div>
        <div className={css.settingContainer}>
          COLUMNS:
          <button className={css.selectorButtons} onClick={removeColumn}> - </button> 
            {props.column} 
          <button className={css.selectorButtons} onClick={addColumn}> + </button>
        </div>
        <div className={css.goToGameContainer}>
          <select value = {props.level?props.level.key:''} className = {css.selector} onChange = {(e)=>onSortLevelSelect(e)}>
            <option defaultValue value = 'level' > level </option>
            {LEVELS.map((level) => {
              return (
                <option value = {level.key} key={level.key}>
                  {level.name}
                </option>
              )
            })}
          </select>
        </div>
        <div className={css.goToGameContainer}>
          <button className={css.goToGame} onClick={onGoToGame}>
            play game
          </button>
        </div>
    </div>
  </div>
}
