import { MiddlewareAPI } from 'redux'

export default (storeApi: MiddlewareAPI) => (next: any) => (action: { type: string, payload: any }) => {
    console.log('logger', action)
    return next(action);
} 