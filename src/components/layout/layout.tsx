import React from 'react';
import { PageHeader } from '../pageHeader';
import { PageSlider } from "../pageSlider";
import { AppMain } from '../appMain';
import style from './index.module.scss';


export default function Layout(): React.ReactElement {
    return (
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
    )
}
