import { axrSetOptions } from 'axr/dist/ASR';
import { getApp } from '../core/application';

axrSetOptions({
    getState: () => {
        return getApp().store.getState()
    },
    dispatch: (action) => {
        return getApp().store.dispatch(action)
    }
})

export * from 'axr/dist/ASR';