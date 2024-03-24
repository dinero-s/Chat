import React, { useState } from 'react'
import css from './Rooms.module.css'


export default function Room({name, deleteRoom, joinRoom}) {

    return (
        <div className={css.container}>
            <div className={css.item}>
                <button className={css.join} onClick={joinRoom}>{"Присоединиться к " + name}</button>
                <button className={css.delete} onClick={deleteRoom}>DELETE</button>
            </div>
        </div>
    )
}
