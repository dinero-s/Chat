import React, { useContext, useRef } from 'react'
import css from './reg.module.css'
import axios from 'axios';
import { ContextUser } from '../../context/User';
import MainLayout from '../../layout/Main';

export default function index() {
  const { user, setUser } = useContext(ContextUser)
  const username = useRef()
  const [password, setPassword] = React.useState('')
  const handleClick = () => {
    axios.post('http://localhost:5000/user/registration', {
      username: username.current.value,
      password: password
    })
      .then(({ data }) => {
        setUser(data)
      })
  }
  return (
    <MainLayout>
      <div className={css.container}>
        <input ref={username} type="text" placeholder="Введите имя..." />
        <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Введите пароль..." />
        <button type="submit" className={css.button} onClick={handleClick} >РЕГИСТРАЦИЯ</button>
      </div>
    </MainLayout>
  )
}