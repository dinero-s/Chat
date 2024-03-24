import React, {useEffect, useRef, useState} from 'react'
import css from './ChatRooms.module.css'
import Room from '../../components/Rooms'
import MainLayout from '../../layout/Main'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function ChatRooms() {
  const [rooms, setRooms] = useState([])
  const inputNameRoomRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:5000/rooms/allRooms', {withCredentials: true})
      .then(({data}) => {
        setRooms(data)
      })
  }, [])



  const handleCreateRooms = () => {
    axios.post('http://localhost:5000/rooms', {
      roomName: inputNameRoomRef.current.value
    }, {withCredentials: true})
      .then(({data}) => {
        setRooms([...rooms, data]);
      })
  }
  
  const deleteRoom = (id) => () => {
    axios.delete(`http://localhost:5000/rooms/delete/${id}`, {withCredentials: true})
      .then(() => {
        setRooms(item => {
          return item.filter(room => room._id !== id)
        });
      })
  }

  const redirectRoom = (id,createId) => () => {
    navigate(`/room/${id}/${createId}`)
  }
  return (<MainLayout>
      <div className={css.container}>
        {rooms.map((element) => {
          return <Room
            key={element._id}
            deleteRoom={deleteRoom(element._id)}
            joinRoom={redirectRoom(element._id, element.idUser)}
            name={element.roomName}
          />
        })}
        <input ref={inputNameRoomRef} type="text" placeholder="Введите название..."/>

        <button className={css.add} onClick={handleCreateRooms}>ADD</button>
      </div>
    </MainLayout>)
}
