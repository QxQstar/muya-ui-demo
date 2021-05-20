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
import { CanvasTree } from '../pages/canvasTree'
import { WebglStar } from '../pages/webglStar'
import { Webglcricle } from '../pages/webglcricle'
import { WebglReact } from '../pages/webglReact'
import {WebglParticle} from '../pages/webglParticle'
import {WebglColor} from '../pages/webglColor'
import { WebglTranslate } from '../pages/webglTranslate'
import { MutilPoints } from '../pages/mutilPoints'
import { ReactTransition } from '../pages/reactTransition'
import { WebglTexture } from '../pages/webglTexture'
import { RXJS } from '../pages/rxjs';
import { WebglMutilTexture } from '../pages/webglMutilTexture'
import { CanvasGrayImg } from '../pages/canvasGrayImg'
import { WebglBeautify } from '../pages/webglBeautify'
import { WebglGeometry } from '../pages/webglGeometry'
import { ThreeTrangle } from '../pages/3DTrangle';

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
                },
                {
                    path: '/basic/component/ReactTransition',
                    menuName: 'React 动画',
                    component: ReactTransition
                },
                {
                    path: '/basic/component/RXJS',
                    menuName: 'rxjs',
                    component: RXJS
                }
            ]
        },
        {
            path: '/basic/canvas',
            menuName: 'canvas',
            routes: [
                {
                    path: '/basic/canvas/hierarchy',
                    menuName: 'canvas hierarchy',
                    component: Hierarchy
                }, 
                {
                    path: '/basic/canvas/canvas',
                    menuName: 'CanvasLearn',
                    component: CanvasLearn
                },
                {
                    path: '/basic/canvas/canvasGame',
                    menuName: 'CanvasGame',
                    component: CanvasGame
                },
                {
                    path: '/basic/canvas/starSky',
                    menuName: 'starSky',
                    component: Sky
                },
                {
                    path: '/basic/canvas/SvgLearn',
                    menuName: 'SvgLearn',
                    component: SvgLearn
                },
                {
                    path: '/basic/canvas/canvasTree',
                    menuName: 'canvasTree',
                    component: CanvasTree
                },
                {
                    path: '/basic/canvas/CanvasGrayImg',
                    menuName: 'canvas 滤镜',
                    component: CanvasGrayImg
                }
            ]
        },
        {
            path: '/basic/webgl',
            menuName: 'webgl', 
            routes: [
                {
                    path: '/basic/webgl/WebglStart',
                    menuName: 'WebGL 三角形',
                    component: WebglStart
                },
                {
                    path: '/basic/webgl/WebGLPoint',
                    menuName: 'WebGL 点',
                    component: WebGLPoint
                },
                {
                    path: '/basic/webgl/WebglClickPoints',
                    menuName: '鼠标点击画点',
                    component: WebglClickPoints
                },
                {
                    path: '/basic/webgl/WebglStar',
                    menuName: 'WebGL 五角星',
                    component: WebglStar
                },
                {
                    path: '/basic/webgl/Webglcricle',
                    menuName: 'WebGL 圆',
                    component: Webglcricle
                },
                {
                    path: '/basic/webgl/WebglReact',
                    menuName: 'WebGL 矩型',
                    component: WebglReact
                },
                {
                    path: '/basic/webgl/WebglParticle',
                    menuName: 'WebGL 动画',
                    component: WebglParticle
                },
                {
                    path: '/basic/webgl/WebglColor',
                    menuName: 'WebGL 颜色',
                    component: WebglColor
                },
                {
                    path: '/basic/webgl/WebglTranslate',
                    menuName: 'WebGL 平移',
                    component: WebglTranslate
                },
                {
                    path: '/basic/webgl/MutilPoints',
                    menuName: 'WebGL 多个点',
                    component: MutilPoints
                },
                {
                    path: '/basic/webgl/WebGLTexture',
                    menuName: '单个纹理',
                    component: WebglTexture
                },
                {
                    path: '/basic/webgl/WebglMutilTexture',
                    menuName: '多个纹理',
                    component: WebglMutilTexture
                },
                {
                    path: '/basic/webgl/WebglBeautify',
                    menuName: 'webgl 美化图片',
                    component: WebglBeautify
                },
                {
                    path: '/basic/webgl/WebglGeometry',
                    menuName: 'webgl 改变几何图像',
                    component: WebglGeometry
                },
            ]
        },
        {
            path: '/basic/webgl3d',
            menuName: 'webgl 3d', 
            routes: [
                {
                    path: '/basic/webgl3d/3Dstart',
                    menuName: 'webgl 3d 开始',
                    component: ThreeTrangle
                },
            ]
        }
    ];
}
