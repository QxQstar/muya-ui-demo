import React, {useState} from 'react'
import {Dropdown, InlineButton, Menu, MenuItem} from '@qunhe/muya-ui'
import {FoldIcon, ReloadIcon, ResetIcon, UnfoldIcon, UserForbiddenIcon} from '@qunhe/muya-theme-light';
import styled from 'styled-components';
import {useHistory} from "react-router-dom";
import ThemeContext, {Theme} from '../../context/themeContext'
import style from './index.module.scss'
import { Lang } from '../../reducers/lang'

const StyleFoldTcon = styled(FoldIcon)`
    margin-left: 10px
`
const StyleUnfoldIcon = styled(UnfoldIcon)`
    margin-left: 10px
`

interface IDropdownMenuProps {
    theme: Theme;
    toggleTheme: (theme: Theme) => void;
    lang: Lang;
    setLang: (lang: Lang) => void
}

function DropdownMenu(props: IDropdownMenuProps): React.ReactElement {
    const history = useHistory();
    const logout = () => {
        history.push("/login")
    }
    const changeTheme = () => {
        props.theme === Theme.Light ? props.toggleTheme(Theme.Dark) : props.toggleTheme(Theme.Light)
    }
    const changeLang = () => {
        props.lang === Lang.en ? props.setLang(Lang.zh) :props.setLang(Lang.en)
    }
    return (
        <Menu>
            <MenuItem
                key="1"
                icon={<UserForbiddenIcon />}
                onClick={logout}
            >
                退出登录
            </MenuItem>
            <MenuItem
                key="2"
                icon={<ResetIcon/>}
                onClick={changeTheme}
            >
                切换主题 {props.theme}
            </MenuItem>
            <MenuItem
                key="3"
                icon={<ReloadIcon />}
                onClick={changeLang}
            >
                切换语言 {props.lang}
            </MenuItem>
        </Menu>
    )
}


export default function PageHeader(props: any): React.ReactElement {
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
                                    {...props}
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
