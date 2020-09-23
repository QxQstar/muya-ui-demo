import React, {useState} from 'react'
import {Dropdown, InlineButton, Menu, MenuItem} from '@qunhe/muya-ui'
import {FoldIcon, ResetIcon, UnfoldIcon, UserForbiddenIcon} from '@qunhe/muya-theme-light';
import styled from 'styled-components';
import {useHistory} from "react-router-dom";
import ThemeContext, {Theme} from '../../context/themeContext'
import style from './index.module.scss'

const StyleFoldTcon = styled(FoldIcon)`
    margin-left: 10px
`
const StyleUnfoldIcon = styled(UnfoldIcon)`
    margin-left: 10px
`

interface IDropdownMenuProps {
    theme: Theme;
    toggleTheme: (theme: Theme) => void;
}

function DropdownMenu(props: IDropdownMenuProps): React.ReactElement {
    const history = useHistory();
    const logout = () => {
        history.push("/login")
    }
    const changeTheme = () => {
        props.theme === Theme.Light ? props.toggleTheme(Theme.Dark) : props.toggleTheme(Theme.Light)
    }
    return (
        <Menu>
            <MenuItem
                icon={<UserForbiddenIcon />}
                onClick={logout}
            >
                退出登录
            </MenuItem>
            <MenuItem
                icon={<ResetIcon/>}
                onClick={changeTheme}
            >
                切换主题
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
        <ThemeContext.Consumer>
            {
                ({theme, toggleTheme}) => (
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
                                overlay={<DropdownMenu
                                    theme={theme}
                                    toggleTheme={toggleTheme}
                                />}
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
        </ThemeContext.Consumer>
    )
}
