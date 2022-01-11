import { createStore, combineReducers, compose} from "redux"
import tetrisMainReducer from './reducers/tetrisMainReducer'


let reducers = combineReducers(
    {
       tetris: tetrisMainReducer,
    }
)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers())
export default store