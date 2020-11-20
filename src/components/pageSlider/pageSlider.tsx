import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import { Menu, MenuItem, SubMenu } from '@qunhe/muya-ui'
import getSilderMenu from '../../config/sliderMenu'
import { ISilderMenu } from '../../type/menu'

const silderMenus = getSilderMenu()
interface ISilderMenuGroupProps {
    menu: ISilderMenu
}

function SilderMenuGroup(props: ISilderMenuGroupProps): React.ReactElement {
    const { menu } = props;
    const history = useHistory();
    const onItemSelect = () => {
        history.push(menu.path);
    }
    if(menu.routes && menu.routes.length) {
        return (
            <SubMenu title={menu.menuName} key={menu.path}>
                {menu.routes.map((route,index) => {
                    return <SilderMenuGroup
                        key={index}
                        menu={route}
                    />
                })}
            </SubMenu>
        )
    } else {
        return (
        <MenuItem
            key={menu.path}
            onItemSelect={onItemSelect}
        >
            {menu.menuName}
        </MenuItem>
        )
    }
}

export default function PageSlider(): React.ReactElement {
    const location = useLocation();
    const defaultSelectedKeys = [location.pathname];
    return (
        <Menu
            selectedKeys={defaultSelectedKeys}
            triggerSubMenuAction='click'
            mode="inline"
        >
            {silderMenus.map((menu,index) => 
                <SilderMenuGroup 
                    menu={menu} 
                    key={index}
                />)
            }
        </Menu>
    )
}
