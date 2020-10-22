import loadable from '@loadable/component'
import { connect } from 'react-redux'
import { fetchUser } from '../../reducers/user'
import { fetchGoodsAction,reciveGoods } from '../../reducers/goods'
const Page  = loadable(() => import('./home'))

const mapStateToProps = (state: any) => {
    return {
        user: state.user,
        goods: state.goods
    }
}

export const Home = connect(
    mapStateToProps,
    {
        fetchUser,
        fetchGoodsAction,
        reciveGoods
    }
)(Page)
