import React from 'react'

import ThemeContext, { IThemeContext } from '../../context/themeContext';

export default class Theme extends React.Component<{}>{
    static contextType = ThemeContext
    context: IThemeContext

    constructor(props: {}, context: IThemeContext) {
        super(props)
        this.context = context
    }

    render() {
        return (<div>
            {this.context.theme}
            </div>)
    }
}