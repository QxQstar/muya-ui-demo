import React from 'react'

export interface ISilderMenu {
    path: string,
    menuName: string,
    component?: any
    exact?: boolean,
    routes?: ISilderMenu[]
}