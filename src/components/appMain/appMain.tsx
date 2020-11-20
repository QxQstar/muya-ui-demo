import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'
import getSilderMenu from '../../config/sliderMenu'
import { ISilderMenu } from '../../type/menu';

const routes = getSilderMenu()

function RouteWithSubRoutes(route: ISilderMenu): React.ReactElement | null {
    if(route.component && !route.routes) {
        return (
            <Route
                path={route.path}
                exact={route.exact}
                render={(props) => {
                    return <route.component {...props} routes={route.routes}/>
                }}
            />
        )
    } else if (route.routes){
        return (
            <SwitchRoute routes={route.routes}/>
        )
    } else {
        return null
    }
}

function SwitchRoute(props: {routes: ISilderMenu[]}): React.ReactElement {
    const { routes } = props;
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

export default function AppMain(): React.ReactElement {
    return (
        <SwitchRoute routes={routes}/>
    )
}
