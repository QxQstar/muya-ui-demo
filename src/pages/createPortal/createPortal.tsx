import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

interface Step {
    selector: string;
    text: string;
}

export default class CreatePortal extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <Step/>
                <div id="step0" style={{backgroundColor: 'red', width: '200px', height:'200px'}}>

                </div>

                <div id="step1" style={{backgroundColor: "salmon", width: '200px', height:'200px', willChange: 'transform'}}>

                </div>
            </div>
        )
    }
}

function Step() {
    const [current, setCurrent] = useState<number>(0)

    const onChangeStep = () => {
        if (current === 0) {
            setCurrent(1)
        } else {
            setCurrent(0)
        }
    }

    const onClick = () => {
        // console.log('ffff')
    }

    return (
        <div onClick={onClick}>
            <Guide 
                steps={[{text: '第一步', selector: '#step1'}, {text: '第二步', selector: '#step2'}]}
                current={current}
            />

            <button onClick={onChangeStep}> change step</button>
        </div>
    )
}

// function Guide(props: {steps: Step[], current: number}) {
//     const step = props.steps[props.current]!
//     const el = document.createElement('div')

//     useEffect(() => {
//         const dom = document.querySelector('#step'+props.current)!
//         dom.appendChild(el)
//         return () => {
//             dom.removeChild(el)
//         };
//     }, [step]);

//     return ReactDOM.createPortal(
//         <div>
//             {step.text}
//         </div>, 
//         el
//     )
// }

class Guide extends React.Component<{steps: Step[], current: number}, {}> {
    el: HTMLDivElement

    constructor(props: {steps: Step[], current: number}) {
        super(props)

        this.el = document.createElement('div', {is: 'div'})
        this.el.style.position = 'absolute'
        this.el.style.left = '30px'
        this.el.style.top = '30px'
    }

    componentDidMount() {
        this.appendNode()
    }

    componentDidUpdate() {
        this.appendNode()
    }

    appendNode() {
        const dom = document.querySelector('#step'+this.props.current)!
        dom.appendChild(this.el)
    }
    render() {
        const step = this.props.steps[this.props.current]!
        return ReactDOM.createPortal(
            <StepText {...step}/>, 
            this.el
        )
    }
}

function StepText(step: Step) {
    useEffect(() => {
        console.log('mount')
        return () => {
            console.log('unmount')
        };
    });
    return (
        <div>
            {step.text}
        </div>
    )
}

