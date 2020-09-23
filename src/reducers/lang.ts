export enum Lang {
    en = 'en',
    zh = 'zh',
}

export enum LangActionType {
    SET = 'SET'
}

export interface IAction {
    type: LangActionType,
    payload?: any
}

export const setLang = (lang: Lang): IAction => ({type: LangActionType.SET, payload: lang});

const initLang = Lang.zh

export default function lang(state: Lang = initLang, action: IAction) {
    switch (action.type) {
        case LangActionType.SET:
            return action.payload;

        default:
            return state
    }
}
