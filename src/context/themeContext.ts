import React from 'react'

export enum Theme {
    Light,
    Dark
}

export default React.createContext({
    theme: Theme.Light,
    toggleTheme: (theme: Theme) => {}
})
