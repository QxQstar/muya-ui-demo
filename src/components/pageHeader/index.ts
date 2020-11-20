import { connect } from 'react-redux'
import Header from './pageHeader'
import { setLang } from '../../reducers/lang';
// import { IAppState } from '../../AXR'
import { RootState } from '../../reducers';


const mapStateToProps = (state: RootState) => {
    return {
        lang: state.lang
    }
}

const mapDispatchToProps = { setLang }

export const PageHeader =  connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)
