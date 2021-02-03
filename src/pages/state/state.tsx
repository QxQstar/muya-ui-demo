import React from 'react';

interface IState {
    name: string;
    count: number
}

export default class State extends React.Component<{}, IState>{
    
    static getDerivedStateFromProps(props: {}, state: IState) {
        console.log(state.count, 'getDerivedStateFromProps')
        return {
            count: state.count + 1
        }
    }

    state: IState = {
        name: '',
        count: 0
    }

    onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: event.target.value
        })
    }

    onChangeCount = () => {
        this.setState((state) => {
            return {
                count: state.count + 1
            }
        })
    }

    render() {
        const { count } = this.state
        console.log(count, 'render')
        return (
            <>
                <input onChange={this.onChangeName}/>
                <button onClick={this.onChangeCount}>click {count}</button>
            </>
        )
    }
}