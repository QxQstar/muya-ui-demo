import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import { Home } from '../../pages/home'

export default function AppMain(): React.ReactElement {
    return (
        <Switch>
            <Route path='/'>
                <Home/>
            </Route>
        </Switch>
    )
}
