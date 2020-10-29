import { connect } from 'react-redux'
import Header from './pageHeader'
import { IAppState } from '../../AXR'


const mapStateToProps = (state: IAppState) => {
    return {
        lang: state.main.lang
    }
}

export const PageHeader =  connect(
    mapStateToProps
)(Header)
