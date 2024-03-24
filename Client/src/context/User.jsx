import React, { useEffect } from 'react'
import axios from 'axios'
export const ContextUser = React.createContext({});


export function ComponentUserContext({ children }) {
  const [user, setUser] = React.useState()
  useEffect(()=>{
    axios.get('http://localhost:5000/user', {
      withCredentials: true
    }).then(({data})=> {
      setUser(data)
    })
  }, [])
  return (
    <ContextUser.Provider value={{ user, setUser }}>
      {children}
    </ContextUser.Provider>
  )
}