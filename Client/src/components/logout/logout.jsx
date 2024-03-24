import React, { useContext } from 'react'
import css from './logout.module.css'
import axios from 'axios'
import { ContextUser } from '../../context/User'
import Auth from '../../pages/auth'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const { user, setUser } = useContext(ContextUser)
    const navigate = useNavigate()

    const handleClick = () => {
        axios.get('http://localhost:5000/user/logout', {
            withCredentials: true
        }).then(() => {
            setUser(undefined)
            document.cookie = "token=sjdfsdf;expires=-1;domain=http://localhost:5173"
            navigate('/auth')
        }).catch(() => {
            setUser(undefined)
            setCookie("token", "username", 1);
        })
    }

    return (
        <div>
            <button type="submit" className={css.button} onClick={handleClick} >LOGOUT</button>
        </div>
    )
}
