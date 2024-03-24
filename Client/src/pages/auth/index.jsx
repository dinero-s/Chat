import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import css from './auth.module.css'
import axios from 'axios'
import { ContextUser } from '../../context/User'
import MainLayout from '../../layout/Main'

export default function index() {
  const { setUser } = useContext(ContextUser)
  const username = useRef()
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()

  const handleClick = () => {

    axios.post('http://localhost:5000/user/authorization', {
      username: username.current.value,
      password: password
    },
      { withCredentials: true })
      .then(({ data }) => {
        setUser(data)
        navigate('/rooms')
      })
  }

  return (
    <MainLayout>
         <div className={css.container}>
          <input ref={username} type="text" placeholder="Введите имя..." />
          <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Введите пароль..." />
          <button type="submit" className={css.button} onClick={handleClick} >АВТОРИЗАЦИЯ</button>
        </div>
    </MainLayout>
  )
}