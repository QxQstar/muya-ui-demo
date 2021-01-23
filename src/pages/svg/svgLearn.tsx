import React from 'react'

import { drawHierarchyBySvg} from './utils'


export default class Theme extends React.Component<{}>{
    
    ref = React.createRef<HTMLDivElement>()

    componentDidMount() {
        drawHierarchyBySvg(this.ref.current!)
    }

    render() {
        return (<div ref={this.ref}>
                
            </div>)
    }
}