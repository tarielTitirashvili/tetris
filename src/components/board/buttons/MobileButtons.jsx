import React from 'react'
import css from './mobileButtons.module.css'
import {
  RIGHT_MOBILE_BUTTON,
  LEFT_MOBILE_BUTTON,
  UP_MOBILE_BUTTON,
  DOWN_MOBILE_BUTTON
} from '../../../constants'

export default function MobileButtons(props) {
  return(
    <div className={css.container}  >
     <button onClick={()=>props.handleUserKeyPress({keyCode:null}, LEFT_MOBILE_BUTTON)} className={css.svg_buttons}>
          <svg  width='60' height='60'>
            <polygon
             points='60,0 0,30 60,60'
             className={css.polygon_buttons}
            />
          </svg>
      </button>
      <div className={css.up_and_down}>
        <button onClick={()=>props.handleUserKeyPress({keyCode:null}, UP_MOBILE_BUTTON)} className={css.svg_buttons}>
          <svg  width='30' height='30'>
            <polygon
             points='15,0 0,30 30,30'
             className={css.polygon_buttons}
            />
          </svg>
        </button>
        <button onClick={()=>props.handleUserKeyPress({keyCode:null}, DOWN_MOBILE_BUTTON)} className={css.svg_buttons}>
          <svg  width='30' height='30'>
            <polygon
             points='30,0 0,0 15,30'
             className={css.polygon_buttons}
            />
          </svg>
        </button>
      </div>
      <button onClick={()=>props.handleUserKeyPress({keyCode:null}, RIGHT_MOBILE_BUTTON)} className={css.svg_buttons}>
          <svg  width='60' height='60'>
            <polygon
             points='0,0 0,60 60,30'
             className={css.polygon_buttons}
            />
          </svg>
      </button>
    </div>
  )
}
