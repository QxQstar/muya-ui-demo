import React from 'react'
import { Spin } from '@qunhe/muya-ui';
import { IStateShpeUser } from './../../reducers/user'
import { IFetchGoodsParam, IGoodsShape, IGoods } from '../../reducers/goods'

interface IProps {
    user: IStateShpeUser,
    goods: IGoodsShape,
    fetchUser: (id: number)=> any,
    fetchGoodsAction: (param: IFetchGoodsParam) => any,
    reciveGoods: (data: IGoods[]) => any
}

export default function Home(props: IProps): React.ReactElement {
    const callback = () => {
        props.fetchUser(455).then(() => {
            console.log('ress')
        })
    }

    const getGoods = () => {
        props.fetchGoodsAction({
            page:1,
            date: new Date().getTime()
        })
    }

    const modifGoods = () => {
        props.reciveGoods([{name: '苹果', price: '3'}])
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
