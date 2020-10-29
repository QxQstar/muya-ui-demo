import { combineReducers } from 'redux'
import { all, spawn } from 'redux-saga/effects'
import mainAXR, { IState } from '../AXR/main'

const sagas = mainAXR.handler;
export const rootSaga = function*() {
    yield all(sagas.map(saga => spawn(saga.saga)));
};

export const rootReducer =  combineReducers(mainAXR.reducer)

export interface IAppState {
    main: IState
}


export default mainAXR;