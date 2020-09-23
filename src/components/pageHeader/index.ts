import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from './pageHeader'
import { setLang } from '../../reducers/lang'


const mapStateToProps = (state: any) => {
    return {
        lang: state.lang
    }
}

const mapDispatchProps = (dispatch: any) => {
    return {
        setLang: bindActionCreators(setLang, dispatch)
    }
}

export const PageHeader =  connect(
    mapStateToProps,
    mapDispatchProps
)(Header)
