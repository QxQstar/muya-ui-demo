import React, { useState } from 'react'
import { Dropdown, Menu, MenuItem, InlineButton } from '@qunhe/muya-ui'
import { FoldIcon, UnfoldIcon, UserForbiddenIcon } from '@qunhe/muya-theme-light';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import style from './index.module.scss'

const StyleFoldTcon = styled(FoldIcon)`
    margin-left: 10px
`
const StyleUnfoldIcon = styled(UnfoldIcon)`
    margin-left: 10px
`


function DropdownMenu(): React.ReactElement {
    const history = useHistory();
    const logout = () => {
        history.push("/login")
    }
    return (
        <Menu>
            <MenuItem
                icon={<UserForbiddenIcon />}
                onClick={logout}
            >
                退出登录
            </MenuItem>
        </Menu>
    )
}


export default function PageHeader(): React.ReactElement {
    const [open, setOpen] = useState(false)
    const onVisibleChange = (visible: boolean): void => {
        setOpen(visible)
    }
    return (
        <div
            className={style.header}
        >
            <div
                className={style.headerMain}
            >
                <h1
                    className={style.title}
                >
                    muya-ui-demo
                </h1>
                <Dropdown
                    overlay={<DropdownMenu />}
                    onVisibleChange={onVisibleChange}
                >
                    <InlineButton
                        type="primary"
                    >
                        何遇
                        {open ? <StyleFoldTcon /> : <StyleUnfoldIcon/>}
                    </InlineButton>
                </Dropdown>
            </div>
        </div>
    )
}
