import { combineReducers } from 'redux'
import lang from './lang'
import user from './user'
import goods from './goods'

export default combineReducers({
    lang,
    user,
    goods
})

export { goodsSaga } from './goods'
