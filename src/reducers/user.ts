import { Dispatch } from "redux"
// import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit'

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

// interface userCaseReducers extends SliceCaseReducers<IStateShpeUser> {
// }

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

// export const fetchUser = createAsyncThunk('fetch/user', () => {
//     function request() {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 resolve({
//                     name: 'bella',
//                     id:12,
//                     nickname: '何遇'
//                 })
//             }, 1000)
//         })
//     }
//     return request()
// })

// const pending = fetchUser.pending;

// const userSlice = createSlice<IStateShpeUser, userCaseReducers>({
//     name: 'user',
//     initialState: {
//         isFetching: false
//     },
//     reducers: {
//         reciveUser(state, action) {
//             state.isFetching = false;
//             state.data = action.payload
//         },
//         requestUser(state) {
//             state.isFetching = true;
//         }
//     },
// })

// export const {reciveUser, requestUser} = userSlice.actions;

// export default userSlice.reducer