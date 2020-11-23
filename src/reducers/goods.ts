import { put, all, takeLatest, call } from 'redux-saga/effects'

enum GoodsActionType {
    reciveGoods = 'reciveGoods',
    requestGoods = 'requestGoods',
}

export interface IAction {
    type: GoodsActionType,
    payload?: any
}

export interface IGoods {
    name: string,
    price: string
}

export interface IGoodsShape {
    fetching: boolean,
    data: IGoods[]
}

export interface IFetchGoodsParam {
    date: number
    page: number
}

export const reciveGoods = (data: IGoods[]): IAction => {
    return {
        type: GoodsActionType.reciveGoods,
        payload: data
    }
}

export const fetchGoodsAction = (param: IFetchGoodsParam): IAction => {
    return {
        type: GoodsActionType.requestGoods,
        payload: param
    }
}

export default function goods(state = {}, action: IAction) {
    switch (action.type) {
        case GoodsActionType.requestGoods:
            return {
                fetching: true
            }
        case GoodsActionType.reciveGoods:
            return {
                fetching: false,
                data: action.payload
            }
        default:
            return state
    }
}

function* fetchGoods(action: IAction) {
    function getGoods() {
        return new Promise(res => {
            setTimeout(() => {
                res([{name: '葡萄',price: '12'}])
            },1000)
        })
    }
    const data = yield call(getGoods)
    yield put(reciveGoods(data))
}

function* waitFetchGoods() {
    yield takeLatest(GoodsActionType.requestGoods, fetchGoods)
}

export function* goodsSaga() {
    yield all([
        waitFetchGoods()
    ])
}
