import React, { useState, useContext } from 'react'

enum THEME {
    light,
    drak
}

interface IContext {
    theme: THEME,
    toggleTheme: (val: THEME) => void
}

const MyContext = React.createContext<IContext>({
    theme: THEME.light,
    toggleTheme: (val: THEME) => {
        throw 'error'
    }
})

function  Block() {
    return <MyContext.Consumer>
        {
            ({theme}) => <div>当前的主题: {theme}</div>
        }     
        </MyContext.Consumer>
}

function  MyButton() {
    const {theme, toggleTheme} = useContext(MyContext)
    return <button onClick={() => theme === THEME.light ? toggleTheme(THEME.drak) : toggleTheme(THEME.light)}>toggleTheme</button>
}

export default function LearnContext() {

    const [theme, setTheme] = useState<THEME>(THEME.light)

    return (
        <MyContext.Provider value={{theme, toggleTheme: setTheme}}>
            <Block/>
            <MyButton/>
        </MyContext.Provider>
    )
}