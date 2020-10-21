import loadable from '@loadable/component'
import { connect } from 'react-redux'
import { fetchUser } from '../../reducers/user'
const Page  = loadable(() => import('./home'))

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

export const Home = connect(
    mapStateToProps,
    {
        fetchUser
    }
)(Page)
