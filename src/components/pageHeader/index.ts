import { connect } from 'react-redux'
import Header from './pageHeader'
import { setLang } from '../../reducers/lang'


const mapStateToProps = (state: any) => {
    return {
        lang: state.lang
    }
}

export const PageHeader =  connect(
    mapStateToProps,
    {
        setLang
    }
)(Header)
