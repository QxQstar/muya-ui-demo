import React from 'react'

import { draw } from './utils' 


export default class Background extends React.Component {
    height: number = 600
    width: number = 600

    componentDidMount() {
        const canvas = document.querySelector('canvas')!
        draw(canvas);
    }
    render () {
        return (
        <div>
            <div>canvas</div>
            <canvas width={this.width} height={this.height}></canvas>
        </div>
        )
    }
    
}