import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import getSilderMenu from '../../config/sliderMenu'
import { ISilderMenu } from '../../type/menu';

const routes = getSilderMenu()

function RouteWithSubRoutes(route: ISilderMenu): React.ReactElement | null {
    if(route.component) {
        return (
            <Route
                path={route.path}
                exact={route.exact}
                render={(props) => {
                    return <route.component {...props} routes={route.routes}/>
                }}
            />
        )
    } else {
        return null
    }
}


export default function AppMain(): React.ReactElement {
    return (
        <Switch>
            {
                routes.map((route, index) => {
                    return <RouteWithSubRoutes
                        key={index}
                        {...route}
                    />
                })
            }
        </Switch>
    )
}
