import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import reduxThunk from 'redux-thunk';
import { Store } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import '../assets/css/global.scss';
import rootReducer, { goodsSaga } from '../reducers';
import loggerMiddleware from '../reduxMiddleware/loggerMiddleware';
// import {rootReducer,rootSaga} from '../AXR'

interface IApplicationOptions {
    component: React.ReactElement
    rootId: string
}

let appInstance: Application

class Application {
    private component: React.ReactElement
    private rootId: string
    private inited: boolean
    store!: Store

    constructor(options: IApplicationOptions) {
        if(appInstance) {
            throw new Error('Application instance has created');
        }
        this.inited = false
        this.component = options.component
        this.rootId = options.rootId
        appInstance = this
    }

    private initStore() {
        const sagaMiddleware = createSagaMiddleware()
        // this.store = store;
        this.store = createStore(
            rootReducer,
            applyMiddleware(
                sagaMiddleware,
                reduxThunk,
                loggerMiddleware
            )
        );
        sagaMiddleware.run(goodsSaga)
    }

    init() {
        this.initStore()
        this.inited = true
        return this
    }

    run() {
        if (!this.inited) {
            throw new Error('Application instance has not inited');
        }
        const root = document.getElementById(this.rootId)
        ReactDOM.render(
            React.createElement(Provider, {
                store: this.store
            }, this.component),
            root
          );
    }
}

export function getApp(): Application {
    return appInstance
}

export default Application