import { combineReducers } from 'redux'
import lang, { Lang } from './lang'
import user, { IStateShpeUser } from './user'
import goods, { IGoodsShape } from './goods'

export default combineReducers({
    lang,
    user,
    goods
})

export interface RootState {
    lang: Lang;
    user: IStateShpeUser;
    goods: IGoodsShape
}

export { goodsSaga } from './goods'
