import { Home } from "../pages/home";
import { Theme } from "../pages/theme";
import { Background } from '../pages/background';
import { Hierarchy } from '../pages/hierarchy'
import { ISilderMenu } from '../type/menu';
import { CanvasLearn } from '../pages/canvas'

export default function (): ISilderMenu[] {
    return [
        {
            path: '/',
            exact: true,
            menuName: '首页',
            component: Home
        },
        {
            path: '/theme',
            menuName: '主题',
            component: Theme
        },
        {
            path: '/basic/component',
            menuName: '基础组件',
            routes: [
                {
                    path: '/basic/component/background',
                    menuName: '背景',
                    component: Background
                },
                {
                    path: '/basic/component/hierarchy',
                    menuName: 'canvas hierarchy',
                    component: Hierarchy
                }, 
                {
                    path: '/basic/component/canvas',
                    menuName: 'CanvasLearn',
                    component: CanvasLearn
                }
            ]
        }
    ];
}
