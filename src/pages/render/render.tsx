import React from 'react'

function render(name: string){
    return (
        <div>
            来自外部的 render , {name}
        </div>
    )
}

const obj = {
    render
}

export default function() {
    return obj.render('beb')
}