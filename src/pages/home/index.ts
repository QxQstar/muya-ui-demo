import loadable from '@loadable/component'
import { connect } from 'react-redux'
const Page  = loadable(() => import('./home'))

const mapStateToProps = (state: any) => {
    return {
        user: state.main.user,
        goods: state.main.goods
    }
}

export const Home = connect(
    mapStateToProps
)(Page)
