import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

const selectLang = (state: RootState) => state.lang

export default function Background () {
    const lang = useSelector(selectLang);
    console.log(lang,'backgroun render')
    return <div>Background</div>
}