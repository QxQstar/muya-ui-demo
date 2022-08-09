import React, { useEffect, useRef } from 'react'
import styles from './index.module.css'

export default function () {
    const rootRef = useRef<HTMLDivElement>(null)
    const dragIcon = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (rootRef.current) {
            const draggableItems = rootRef.current.querySelectorAll('.draggable') as NodeListOf<HTMLDivElement>
            draggableItems.forEach(item => {
                item.addEventListener('dragstart', (e: DragEvent) => {
                    const target: HTMLElement | null = e.target as HTMLElement | null
                    if (target) {
                        target.style.opacity = '0.1'
                    }

                    if (e.dataTransfer && dragIcon.current) {
                        e.dataTransfer.setDragImage(dragIcon.current, 20,20)
                    }

                    if (e.dataTransfer && target) {
                        e.dataTransfer.setData('text/html', target.innerHTML)
                        e.dataTransfer.setData('din','ee')
                    }

                })

                item.addEventListener('dragend', (e) => {
                    const target: HTMLElement | null = e.target as HTMLElement | null
                    if (target) {
                        target.style.opacity = '1'
                    }
                })
            })

            const dropTargets = rootRef.current.querySelectorAll('.dropTarget') as NodeListOf<HTMLDivElement>
            dropTargets.forEach(dropTarget => {
                // 当一个可拖动的元素进入它时，它触发 dragenter
                dropTarget.addEventListener('dragenter', (e: DragEvent) => {
                    const target = e.target as HTMLDivElement
                    if (target) {
                        target.style.borderColor = 'red'
                    }

                    if (e.dataTransfer?.dropEffect) {
                        e.dataTransfer.dropEffect = 'move'
                    }
                })
                // 当一个可拖动的元素离开它时，它触发 dragleave
                dropTarget.addEventListener('dragleave', (e: DragEvent) => {
                    const target = e.target as HTMLDivElement
                    if (target) {
                        target.style.borderColor = '#666'
                    }
                })

                // 让 drop 不往上冒泡，如果冒泡到 document，浏览器可能有一些奇怪的重定向。
                dropTarget.addEventListener('drop', (e: DragEvent) => {
                    e.stopPropagation()
                    e.preventDefault()
                    // const target: HTMLElement | null = e.target as HTMLElement | null
                    // if (e.dataTransfer && target) {
                    //     target.innerHTML = e.dataTransfer.getData('text/html')
                    //     console.log(e.dataTransfer.getData('din'))
                    // }
                    console.log(e.dataTransfer?.items[0])
                    e.dataTransfer?.items[1].getAsString(data => {
                        console.log(data)
                    })
              
                    
                })

                // dragover 事件的默认行为是将 e.dataTransfer.dropEffect 设置为 none，这样 drop 事件将不被触发
                // 阻止它的默认行为让 e.dataTransfer.dropEffect 不哪设置为 none。
                dropTarget.addEventListener('dragover', (e: DragEvent) => {
                    e.preventDefault()
                    if (e.dataTransfer?.dropEffect) {
                        e.dataTransfer.dropEffect = 'move'
                    }
                })
            })
        }
    }, [])

    return (
        <div className={styles.container} ref={rootRef}>
            <div draggable="true" className={`${styles.box} draggable`}>可拖动的元素</div>

            <div className={`${styles.dropArea} dropTarget`}>拖到这里</div>

            <div ref={dragIcon} style={{background: 'green'}}>自定义拖拽过程中的 feedback</div>
        </div>
    )
}