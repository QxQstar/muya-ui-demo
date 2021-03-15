import React, { useEffect, useState } from 'react';

import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

import './index.scss'

export default function ReactTransitiom() {
    const [list, setList] = useState([{id: 1, name:'one'}])
    const [showChild, setShowChild] = useState(false);
    const addList = () => {
        setShowChild(true)
        setList([{id: 2 + Math.random(), name:'two'}, {id: 3 + Math.random(), name:'three'}])
    }

    const back = () => {
        setShowChild(false)
        setList([{id: 1, name:'one'}])
    }
    return (
        <div>
            {showChild && 
            <button
                onClick={back}
            >
                back
            </button>
            }
            <TransitionGroup className="react-transition">
                {list.map(item => (
                    <CSSTransition
                        key={item.id}
                        timeout={500}
                        className="react-transition-item"
                    >
                        <div>
                            {item.name}
                            {!showChild && 
                            <span 
                                className="togle"
                                onClick={addList}
                            >
                                》 
                            </span>
                            }
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}