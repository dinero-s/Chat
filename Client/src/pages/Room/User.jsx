import React, { useEffect, useState } from 'react'
import css from './Room.module.css'
import { useRef } from 'react'

export default function User({ isMe, username, clickPrivate, deleteUser, isCreatorRoom}) {
    const [show, setShow] = useState()
    const tableRef = useRef()
    useEffect(()=>{
        if(show) {
            const clickOther = (evt) => {
                setShow(item=> {
                    const isModal = evt.target === tableRef.current || evt.target.parentElement === tableRef.current
                    if(item && tableRef && !isModal){
                        return false
                    }
                    return item
                })
            }
            window.addEventListener("click", clickOther)
            return ()=> {
                removeEventListener("click", clickOther)
            }
        }
        
    }, [show])



    return (
        <div onClick={()=>{
            if(!show && !isMe){
                setTimeout(()=>setShow(true), 200)
            }
        }} className={css.username}>
            {username}
            {
                show && 
                <div ref={tableRef} className={css.modalWindow}>
                    <button onClick={()=> {
                        clickPrivate()
                        setShow(false)
                    }}>PRIVATE</button>
                   {isCreatorRoom &&
                    <button onClick={deleteUser}>DELETE</button>}
                </div>
            }
        </div>

    )
}
