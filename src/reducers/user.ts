export interface IUser {
    name: string
    [attr: string]: string
}

enum UserActionType {
    changeName
}
interface IAction {
    type: UserActionType,
    payload?: any
}

const user: IUser= {
    name: 'Bella'
}

export function changeName(name: string): IAction {
    return {type: UserActionType.changeName, payload: name}
} 

export default function User(state: IUser = user, action: IAction) {
    switch (action.type) {
        case UserActionType.changeName:
            return {
                name: action.payload
            }    

        default:
            return state
    }
}