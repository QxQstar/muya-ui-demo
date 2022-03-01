import React, { useEffect } from "react";
import User from './props';

export default function() {
    useEffect(() => {
        const user = new User('bbb')
        console.log(user.getName())
    }, [])

    return (
        <div>about promise44</div>
    )
}