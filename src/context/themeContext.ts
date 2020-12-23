import React from 'react'

export enum Theme {
    Light,
    Dark
}

export interface IThemeContext {
    theme: Theme;
    toggleTheme: (theme: Theme) => void
}

export default React.createContext<IThemeContext>({
    theme: Theme.Light,
    toggleTheme: (theme: Theme) => {}
})
