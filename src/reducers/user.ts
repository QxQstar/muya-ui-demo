import { Dispatch } from "redux"

export interface IUser {
    name: string
    [attr: string]: string | number
}

export interface IStateShpeUser {
    isFetching: boolean
    data?: IUser
}

enum UserActionType {
    reciveUser,
    requestUser,
}
interface IAction {
    type: UserActionType,
    payload?: any
}

// action
export const reciveUser = (data: IUser): IAction => ({type: UserActionType.reciveUser, payload: data})
export const requestUser = (): IAction => ({type: UserActionType.requestUser})
export const fetchUser = (id: number) => {
    return (dispatch: Dispatch) => {
        dispatch(requestUser())
        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch(reciveUser({
                    name: 'bella',
                    id: id,
                    nickname: '何遇'
                }))
                resolve()
            }, 2000)
        })
    }
}


// reducer
export default function User(state: IStateShpeUser = {isFetching: false}, action: IAction) {
    switch (action.type) {
        case UserActionType.reciveUser:
            return {
                isFetching: false,
                data: action.payload
            }    
        case UserActionType.requestUser:
            return {
                isFetching: true
            }
        default:
            return state
    }
}