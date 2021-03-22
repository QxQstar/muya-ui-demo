import React from 'react'

import { draw } from './utils' 


export default class Background extends React.Component {
    height: number = 600
    width: number = 600

    componentDidMount() {
        const canvas = document.querySelector('canvas')!
        draw(canvas);

        const evt = document.createEvent('Event');
        const fakeNode = document.createElement('react');
        const evtType = 'fake-event'
        
        window.addEventListener('error', () => {
            
            console.log('two')
        });

        fakeNode.addEventListener(evtType, () => {
            // 在这里调用用户提供的方法

            console.log('one')
            // JSON.parse("{ddd}")
        }, false);

        evt.initEvent(evtType, false, false);
        fakeNode.dispatchEvent(evt);
        console.log('three')

        
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