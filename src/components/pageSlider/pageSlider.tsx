import React from 'react'
import { Menu, MenuItem, SubMenu } from '@qunhe/muya-ui'
import getSilderMenu from '../../config/sliderMenu'
import { ISilderMenu } from '../../type/menu'

const silderMenus = getSilderMenu()
interface ISilderMenuGroupProps {
    menu: ISilderMenu
}

function SilderMenuGroup(props: ISilderMenuGroupProps): React.ReactElement {
    const { menu } = props;
    if(menu.routes && menu.routes.length) {
        return (
            <SubMenu title={menu.menuName}>
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
        <MenuItem>
            {menu.menuName}
        </MenuItem>
        )
    }
}

export default function PageSlider(): React.ReactElement {
    return (
        <Menu
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
