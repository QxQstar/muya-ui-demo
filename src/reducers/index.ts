import { combineReducers } from 'redux'
// import { configureStore } from '@reduxjs/toolkit'
import lang, { ILangState } from './lang'
import user, { IStateShpeUser } from './user'
import goods, { IGoodsShape } from './goods'



export default combineReducers({
    lang,
    user,
    goods
})

export interface RootState {
    lang: ILangState;
    user: IStateShpeUser;
    goods: IGoodsShape
}

// export default configureStore({
//     reducer:{
//         lang,
//         user,
//         goods
//     }
// })

export { goodsSaga } from './goods'
