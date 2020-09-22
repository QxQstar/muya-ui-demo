import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import { PageHeader } from '../pageHeader';
import { PageSlider } from "../pageSlider";
import { AppMain } from '../appMain';
import style from './index.module.scss';


export default function Layout() {
    return (
        <Router>
            <div className={style.layoutContainer}>
                <PageHeader/>
                <div className={style.layoutMain}>
                    <div className={style.layoutSlider}>
                        <PageSlider/>
                    </div>
                    <div className={style.appMain}>
                        <AppMain/>
                    </div>
                </div>
            </div>
        </Router>
    )
}
