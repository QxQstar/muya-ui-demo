import React from 'react'
import { Spin } from '@qunhe/muya-ui';
import { IStateShpeUser } from './../../reducers/user'

interface IProps {
    user: IStateShpeUser,
    fetchUser: (id: number)=> any
}

export default function Home(props: IProps): React.ReactElement {
    const callback = () => {
        props.fetchUser(455).then(() => {
            console.log('ress')
        })
    }

    return (
        <div>
            {props.user.isFetching && <Spin color="orange" />}
            {!props.user.isFetching && props.user.data && props.user.data.name}
            <input></input>
            <button onClick={callback}>fetch</button>
        </div>
    )
}
