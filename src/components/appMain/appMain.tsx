import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import {Home} from '../../pages/home'

export default function AppMain() {
    return (
        <Switch>
            <Route path='/'>
                <Home/>
            </Route>
        </Switch>
    )
}
