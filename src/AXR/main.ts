import { actionCreator, sagaCreator, axr, reducersCreator } from './setup'
import produce from 'immer';

import { put } from 'redux-saga/effects'

enum Lang {
    en = 'en',
    zh = 'zh',
}

interface IUserState {
    data?: IUser
    isFetching: boolean
}

interface IUser {
    name: string
    [attr: string]: string | number
}

interface IFetchGoodsParam {
    date: number
    page: number
}

interface IGoods {
    name: string,
    price: string
}
interface IGoodsShape {
    fetching: boolean,
    data?: IGoods[]
}

export interface IState {
    lang: Lang
    user: IUserState
    goods: IGoodsShape
}
const langAction = actionCreator<Lang>('lang')
const userAction = actionCreator.async<number,IUser>('user')
const fetchGoodsAction = actionCreator.async<IFetchGoodsParam, IGoods[]>('fetchgoodsAction')
const modifyGoodsAction = actionCreator<IGoods[]>('modifyGoodsAction')

const userSaga = sagaCreator(userAction.started, function* (payload) {
    const user = yield fetchUser(payload)
    yield put(userAction.done({
        params: payload,
        result: user
    }))
})
const fetchGoodsSaga = sagaCreator(fetchGoodsAction.started, function* (payload) {
    const goods = yield getGoods()
    yield put(fetchGoodsAction.done({
        params: payload,
        result: goods
    }))
})

function fetchUser(id: number) {
    return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    name: 'bella',
                    id: id,
                    nickname: '何遇'
                })
            }, 2000)
        })
}

function getGoods() {
    return new Promise(res => {
        setTimeout(() => {
            res([{name: '葡萄',price: '12'}])
        },1000)
    })
}


const initGoods: IState = {
    lang: Lang.zh,
    user: {
        isFetching: false
    },
    goods: {
        fetching: false
    }
}

const reducer = reducersCreator(initGoods)
.case(fetchGoodsAction.started, (state) => {
    return produce(state, (draftState) => {
         draftState.goods.fetching = true
    })
})
.case(fetchGoodsAction.done, (state, payload) => {
    return produce(state, draftState => {
        draftState.goods = {
            fetching: false,
            data: payload.result
        }
    })
})
.case(modifyGoodsAction, (state, payload) => {
    return produce(state, draftState => {
        draftState.goods = {
            fetching: false,
            data: payload
        }
    })
})
.case(langAction, (state, payload) => {
    return produce(state, draftState => {
        draftState.lang = payload
    })
})
.case(userAction.done, (state, payload) => {
    return produce(state, draftState => {
        draftState.user = {
            isFetching: false,
            data: payload.result
        }
    })
})
.case(userAction.started, (state, payload) => {
    return produce(state, draftState => {
        draftState.user = {
            isFetching: true
        }
    })
})



export default axr(
    {
        langAction,
        userAction,
        fetchGoodsAction,
        modifyGoodsAction
    },
    [
        userSaga,
        fetchGoodsSaga
    ],
    {
        main: reducer
    }
)


/**
 * 可以没有 saga，但是 action 和 reducer 一定要有
 * saga 相当于一个观察者,它用来观察 action 的触发。在 saga 中可以触发一些另外的 action
 * reducer 决定了在特定的 action 被触发之后根据 action 的 type 来修改 state
 */