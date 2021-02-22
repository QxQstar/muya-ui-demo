import { Home } from "../pages/home";
import { Theme } from "../pages/theme";
import { Background } from '../pages/background';
import { Hierarchy } from '../pages/hierarchy'
import { ISilderMenu } from '../type/menu';
import { CanvasLearn } from '../pages/canvas';
import  { CanvasGame } from '../pages/canvasGame';
import { Sky } from '../pages/starSky'
import { SvgLearn } from '../pages/svg';
import { WebglStart } from '../pages/webglStart';
import { WebGLPoint } from '../pages/webglPoint';
import { WebglClickPoints } from '../pages/webglClickPoints';
import { State }  from '../pages/state';
import { LearnEffect } from '../pages/useEffect';
import { LearnContext } from '../pages/useContext'
import { LearnReducer } from '../pages/useReducer'
import { LearnRef } from '../pages/useRef'
import { MergeState } from '../pages/mergeState'
import { ConputedW } from '../pages/conputedW'

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
            path: '/state',
            menuName: 'state',
            component: State
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
                },
                {
                    path: '/basic/component/canvasGame',
                    menuName: 'CanvasGame',
                    component: CanvasGame
                },
                {
                    path: '/basic/component/starSky',
                    menuName: 'starSky',
                    component: Sky
                },
                {
                    path: '/basic/component/SvgLearn',
                    menuName: 'SvgLearn',
                    component: SvgLearn
                },
                {
                    path: '/basic/component/WebglStart',
                    menuName: 'WebGL 三角形',
                    component: WebglStart
                },
                {
                    path: '/basic/component/WebGLPoint',
                    menuName: 'WebGL 点',
                    component: WebGLPoint
                },
                {
                    path: '/basic/component/WebglClickPoints',
                    menuName: '鼠标点击画点',
                    component: WebglClickPoints
                },
                {
                    path: '/basic/component/useEffect',
                    menuName: 'useEffect',
                    component: LearnEffect
                },
                {
                    path: '/basic/component/useContext',
                    menuName: 'useContext',
                    component: LearnContext
                },
                {
                    path: '/basic/component/useReducer',
                    menuName: 'useReducer',
                    component: LearnReducer
                },
                {
                    path: '/basic/component/useRef',
                    menuName: 'useRef',
                    component: LearnRef
                },
                {
                    path: '/basic/component/MergeState',
                    menuName: 'MergeState',
                    component: MergeState
                },
                {
                    path: '/basic/component/ConputedW',
                    menuName: 'ConputedW',
                    component: ConputedW
                }
            ]
        }
    ];
}
