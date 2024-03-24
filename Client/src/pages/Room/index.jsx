import React, {useContext, useEffect, useRef, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import css from './Room.module.css'
import MainLayout from '../../layout/Main'
import {ContextUser} from '../../context/User'
import User from './User'
import cn from "classnames"
import axios from "axios";

export default function Room() {
    const [privateUser, setPrivateUser] = useState()
    const {id, createId} = useParams()
    const [msg, setMsg] = useState([])
    const [userList, setUserList] = useState([])
    const inputRef = useRef()
    const socketRef = useRef()
    const {user} = useContext(ContextUser)
    const [reconnect, setReconnect] = useState(true)
    const isCreatorRoom = user.id == createId;


    useEffect(() => {
        if(reconnect){
            console.log("reconnect")

            socketRef.current = new WebSocket(`ws://localhost:5000/rooms/room/${id}`)

            socketRef.current.onmessage = (({data}) => {
                const wsMsg = JSON.parse(data)
                if (wsMsg.type === "message") {
                    setMsg(item => [...item, wsMsg.data])
                } else if (wsMsg.type === "userList") {
                    setUserList(wsMsg.data.userList)
                }
            })
            socketRef.current.onclose =()=> {
                setTimeout(()=> {
                    socketRef.current.close()
                    delete socketRef.current
                    setReconnect(true)
                }, 2000)

            }
            setReconnect(false)
        }
    }, [reconnect])
    useEffect(()=>()=> {
        if(socketRef.current) {
            socketRef.current.onclose =()=>{}
            socketRef.current.close()
            delete socketRef.current
        }
    }, [])

    const handleSend = () => {
        let message;
        if(privateUser) {
            message = JSON.stringify({
                type: "private",
                data: {
                    user: privateUser,
                    message:inputRef.current.value
                }
            })
        } else {
            message = JSON.stringify({
                type: "all",
                message: inputRef.current.value
            })
        }
        socketRef.current.send(message)
        inputRef.current.value = ''
    }
    const handleDeleteUser = (user)=>() => {
        axios.delete(`http://localhost:5000/rooms/deleteUser/${id}/${user}`, {withCredentials: true})
          .then(() => {
              console.log("User deleted")
          })
    }

    return (
        <MainLayout>
            <div className={css.container}>
                <div className={css.chat}>
                    <div className={css.screen}>
                        {user && msg.map((element, id) => {
                            const isMe = element.user === user.username
                            const clickPrivate = () => setPrivateUser(element.user)
                            return <div
                                key={id}
                                className={
                                    isMe
                                        ? css.textAreaRLeft
                                        : css.textAreaRight
                                }
                            >
                                <div className={cn(
                                    css.textArea,
                                    {[css.privateTextArea]: element.private}
                                )}>
                                    <User isCreatorRoom={isCreatorRoom} deleteUser={handleDeleteUser(element.username)} clickPrivate={clickPrivate} isMe={isMe} username={element.user}/>
                                    <div className={css.textMessage}>
                                        {element.message}
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className={css.item}>
                        <div className={css.input_group}>
                            <input onKeyDown={(e) => e.key === "Enter" ? handleSend() : ""} ref={inputRef}
                                   className={cn(
                                       css.input_message,
                                       {[css.input_message__private]: privateUser}
                                   )} type="text" placeholder="Введите текст сообщения..."/>
                            {privateUser && <div className={css.input_group_field}>
                                <div className={css.private_username}>
                                    {privateUser}
                                </div>
                                <div onClick={() => setPrivateUser(undefined)} className={css.cansel_x}>
                                    X
                                </div>
                            </div>}
                        </div>
                        <button onClick={handleSend} type='button'>SEND</button>
                    </div>
                </div>
                <div className={css.users}>
                    <Link to='/rooms' className={css.exitLink}>EXIT</Link>
                    <div className={css.users_list}>
                        {user && userList.map((element) => {
                            const clickPrivate = () => setPrivateUser(element)
                            return <User isCreatorRoom={isCreatorRoom} deleteUser={handleDeleteUser(element)} clickPrivate={clickPrivate} key={element} isMe={element === user.username}
                                         username={element}/>
                        })}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
