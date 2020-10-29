import React from 'react'
import { Spin } from '@qunhe/muya-ui';
import { IStateShpeUser } from './../../reducers/user'
import { IGoodsShape } from '../../reducers/goods'
import AXR from '../../AXR'

interface IProps {
    user: IStateShpeUser,
    goods: IGoodsShape,
}

export default function Home(props: IProps): React.ReactElement {
    const callback = () => {
        AXR.action.userAction.started.dispatch(455)
    }

    const getGoods = () => {
        AXR.action.fetchGoodsAction.started.dispatch({
            page:1,
            date: new Date().getTime()
        })
    }

    const modifGoods = () => {
        AXR.action.modifyGoodsAction.dispatch([{name: '苹果', price: '3'}])
    }

    return (
        <div>
            {props.user.isFetching && <Spin color="orange" />}
            {!props.user.isFetching && props.user.data && props.user.data.name}
            <input></input>
            <button onClick={callback}>fetch</button>

            <div style={{margin: '20px'}}>
                {props.goods.fetching && <Spin color="orange" />}
                {!props.goods.fetching && props.goods.data && props.goods.data[0].name}
                <button onClick={getGoods}>getGoods</button>
                <button onClick={modifGoods}>modify goods</button>
            </div>
        </div>
    )
}
