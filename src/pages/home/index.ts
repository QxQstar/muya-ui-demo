import loadable from '@loadable/component'
import { connect } from 'react-redux'

import { RootState } from '../../reducers';
import { fetchUser } from '../../reducers/user';
import { fetchGoodsAction, reciveGoods } from '../../reducers/goods'

const Page  = loadable(() => import('./home'))

const mapStateToProps = (state: RootState) => {
    return {
        user: state.user,
        goods: state.goods,
    }
}

const mapDispatchToProps = {
    fetchUser,
    fetchGoodsAction,
    modifyGoods: reciveGoods
}

export const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)
